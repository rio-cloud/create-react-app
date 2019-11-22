import './polyfills';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Router, Switch } from 'react-router-dom';

import { main, handleLoginRedirect, history, store } from './configuration';

import { config } from './config';
import AppContainer from './features/app/containers/App.container';
import { NoMatch } from './features/app/components/NoMatch';

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

if (window.location.href.startsWith(config.login.redirectUri as string)) {
    handleLoginRedirect();
} else {
    main(renderApplication);
}
