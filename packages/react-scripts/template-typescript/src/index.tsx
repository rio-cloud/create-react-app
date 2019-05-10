import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Router, Switch } from 'react-router-dom';

import './index.css';
import { EVENT_USER_LANGUAGE_CHANGED, EVENT_USER_LOGGED_OUT, EVENT_USER_PROFILE_CHANGED } from 'rio-accountmenu';

import { NoMatch } from './features/app/components/NoMatch';

import { history, store } from './setup/store';
import { configureFetchLanguageData } from './features/lang/services';
import { accessToken } from './features/tokenHandling/accessToken';
import { redirectToLogout } from './features/login/logout';
import { userProfileObtained, userSessionExpired, userSessionRenewed } from './features/login/actions';
import { extractLanguage } from './features/lang/lang';
import { getLocale } from './features/lang/selectors';
import { accessTokenStored, idTokenStored } from './features/tokenHandling/actions';
import { OAuthConfig, OAuthPublishedInfo } from './features/login/types';
import { SIGNIN_REQUESTED, mockOAuth, retrieveInitialState, setupOAuth } from './features/login/login';
import AppContainer from './features/app/containers/App.container';
import { Config } from './setup/config';
import handleLoginRedirect from './features/login/redirect';

const trace = process.env.NODE_ENV !== 'production' ? (...args: Array<any>) => console.log('[src/index]', ...args) : () => {};

const oauthBehavior = (settings: OAuthConfig) => {
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
    const root = document.getElementById('root');
    const fetchLanguageData = configureFetchLanguageData(store);
    const onLogout = () => {
        accessToken.discardAccessToken();
        redirectToLogout();
    };

    const renewToken = (...args: Array<any>) => {
        trace('index.renewToken(', ...args, ')');
        const ev = new CustomEvent(SIGNIN_REQUESTED);
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

        if (html && lang && html.getAttribute('lang') !== lang) {
            html.setAttribute('lang', lang);
        }
    });

    let renderApp = () => {
        renderApp = () => {};
        // Note that we need to use the base "Router" with a "hash" history
        // because the "HashRouter" doesn't allow handing in a history
        // from the outside. So this is effectively a "HashRouter" despite
        // that not being obvious here
        ReactDOM.render(
            <Provider store={store}>
                <Router history={history}>
                    <Switch>
                        <Route path="/error" component={NoMatch} />
                        <Route path="/" component={AppContainer} />
                        <Route component={NoMatch} />
                    </Switch>
                </Router>
            </Provider>,
            root
        );
    };

    const oauthConfig: OAuthConfig = {
        onSessionError: (error: Error) => {
            trace('index.onSessionError', error);
        },
        onTokenExpired: () => {
            trace('index.onTokenExpired');

            accessToken.discardAccessToken();
            store.dispatch(userSessionExpired());
        },
        onTokenRenewed: (result: OAuthPublishedInfo) => {
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

            fetchLanguageData(result.locale)
                .then(() => {
                    trace(`Language data fetched for "${result.locale}"`);
                    renderApp();
                })
                .catch(error => {
                    // eslint-disable-next-line no-console, max-len
                    console.error(`Language data for "${result.locale}" could not be fetched.`, error);
                });
        },
    };

    oauthBehavior(oauthConfig).catch((error: Error) => {
        trace('auth problem?', error);
    });
}

if (window.location.href.startsWith(Config.login.redirectUri as string)) {
    handleLoginRedirect();
} else {
    main();
}
