import './polyfills';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import AppContainer from './features/AppContainer';
import { NoMatch } from './features/app/NoMatch';
import { ErrorBoundary } from './features/app/ErrorBoundary';

import { config } from './config';
import { main, handleLoginRedirect, history, store } from './configuration';

function renderApplication() {
    const root = document.getElementById('root');

    // Note that we need to use the base "Router" with a "hash" history
    // because the "HashRouter" doesn't allow handing in a history
    // from the outside. So this is effectively a "HashRouter" despite
    // that not being obvious here
    ReactDOM.render(
        <ErrorBoundary>
            <Provider store={store}>
                <Router history={history}>
                    <Switch>
                        <Route path={'/error'} component={NoMatch} />
                        <Route path={'/'} component={AppContainer} />
                        <Route component={NoMatch} />
                    </Switch>
                </Router>
            </Provider>
        </ErrorBoundary>,
        root
    );
}

if (window.location.href.startsWith(config.login.redirectUri)) {
    handleLoginRedirect();
} else {
    main(renderApplication);
}
