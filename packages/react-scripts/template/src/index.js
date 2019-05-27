import './polyfills';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import AppContainer from './features/AppContainer';
import { NoMatch } from './features/app/NoMatch';

import './index.css';

import { Config } from './config';
import { main, handleLoginRedirect, history, store } from './configuration';

function renderApplication() {
  const root = document.getElementById('root');

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

      window.Raven.context(() => {main(renderApplication);});
  } else {
      // eslint-disable-next-line no-console
      console.warn('No Sentry found, you should tread lightly...');
      main(renderApplication);
  }
}
