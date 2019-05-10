import './polyfills';

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import {
  EVENT_USER_LANGUAGE_CHANGED,
  EVENT_USER_LOGGED_OUT,
  EVENT_USER_PROFILE_CHANGED,
} from 'rio-accountmenu';

import { configureReporting } from './setup/errorReporting';
import { history, store } from './setup/store';

import AppContainer from './features/AppContainer';
import { NoMatch } from './features/app/NoMatch';

import { getLocale } from './features/lang/selectors';
import { extractLanguage } from './features/lang/lang';
import { configureFetchLanguageData } from './features/lang/services';
import {
  SIGNIN_REQUESTED,
  mockOAuth,
  retrieveInitialState,
  setupOAuth,
} from './features/login/login';
import { redirectToLogout } from './features/login/logout';
import {
  userProfileObtained,
  userSessionExpired,
  userSessionRenewed,
} from './features/login/actions';
import { accessToken } from './features/tokenHandling/accessToken';
import { accessTokenStored, idTokenStored } from './features/tokenHandling/actions';

import './index.css';
import { Config } from './setup/config';
import handleLoginRedirect from './features/login/redirect';


const { captureException } = configureReporting(window, process.env);

const trace = process.env.NODE_ENV !== 'production' ? (...args) => console.log('[src/index]', ...args) : () => {};

const oauthBehavior = (settings) => {
  const isAllowedToMockAuth = process.env.NODE_ENV !== 'production';
  const promise = isAllowedToMockAuth && Config.login.mockAuthorization ? mockOAuth(settings) : setupOAuth(settings);

  return promise.then(() => {
      const { initialRoute } = retrieveInitialState();

      trace('initialRoute lookup', initialRoute);
      if (initialRoute) {
          trace(`history.replace("/${initialRoute}")`);
          history.replace(`/${initialRoute}`);
      }

      return Promise.resolve();
  });
};


function main() {
  const root = document.querySelector('#root');
  const fetchLanguageData = configureFetchLanguageData(store);

  const onLogout = () => {
      accessToken.discardAccessToken();
      redirectToLogout();
  };

  const renewToken = (...args) => {
      trace('index.renewToken(', ...args, ')');
      const ev = new window.CustomEvent(SIGNIN_REQUESTED);
      document.dispatchEvent(ev);
  };

  document.addEventListener(EVENT_USER_LOGGED_OUT, onLogout);
  document.addEventListener(EVENT_USER_LANGUAGE_CHANGED, renewToken);
  document.addEventListener(EVENT_USER_PROFILE_CHANGED, renewToken);

  // We want the `<html lang>` attribute to be synced with the
  // language currently displayed
  store.subscribe(() => {
    const lang = extractLanguage(getLocale(store.getState()));
    const html = document.querySelector('html');

    if (html.getAttribute('lang') !== lang) {
      html.setAttribute('lang', lang);
    }
  });

  let renderApp = () => {
    renderApp = () => {};

    // Note that we need to use the base "Router" with a "hash" history
    // because the "HashRouter" doesn't allow handing in a history
    // from the outside. So this is effectively a "HashRouter" despite
    // that not being obvious here
    render(
    <Provider store={store}>
      <Router history={history}>
      <Switch>
      <Route path='/error' component={NoMatch}/>
    <Route path='/' component={AppContainer}/>
    <Route component={NoMatch}/>
    </Switch>
    </Router>
    </Provider>,
    root
  );
  };

  const oauthConfig = {
    onSessionError: (error) => {
      trace('index.onSessionError', error);
      captureException(error);
    },
    onTokenExpired: () => {
      trace('index.onTokenExpired');

      accessToken.discardAccessToken();
      store.dispatch(userSessionExpired());
    },
    onTokenRenewed: (result) => {
      trace('index.onTokenRenewed', result);

      accessToken.saveAccessToken(result.accessToken);
      store.dispatch(accessTokenStored(result.accessToken));
      store.dispatch(idTokenStored(result.idToken));
      store.dispatch(userProfileObtained(result.profile));

      store.dispatch(userSessionRenewed());

      // You will need to get the user language by yourself then
      // you may fetch the suitable messages from the CDN. Depending
      // on when and from where you fetch the user settings you might
      // want to employ a loading spinner while the request is ongoing.
      fetchLanguageData(result.locale).then(() => {
        trace(`Language data fetched for "${result.locale}"`);
        renderApp();
      }).catch((error) => {
        // eslint-disable-next-line no-console, max-len
        console.error(`Language data for "${result.locale}" could not be fetched.`, error);
        captureException(error);
      });
    },
  };

  oauthBehavior(oauthConfig).catch((error) => {
    trace('auth problem?', error);
  });
}

if (window.location.href.startsWith(Config.login.redirectUri)) {
  handleLoginRedirect();
} else {
  if (window.Raven) {
      if (process.env.NODE_ENV === 'production') {
          window.Raven.config(Config.sentryToken, {
            // release: ...
            environment: 'production',
          }).install();
      }

      window.Raven.context(main);
  } else {
      // eslint-disable-next-line no-console
      console.warn('No Sentry found, you should tread lightly...');
      main();
  }
}
