import { createHashHistory } from 'history';
import { applyMiddleware, createStore, Middleware, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { rootReducer } from './reducers';

//
// Setup for Browser extension "Redux DevTools":
// (`window.devToolsExtension` has been deprecated)
//
// https://github.com/zalmoxisus/redux-devtools-extension#13-use-redux-devtools-extension-package-from-npm
//
// We want to be able to see what happened if an error occurs in `production`
// mode without disturbing the performance with the console logger that is
// normally running only in `development`. We restrict the information flowing
// through the devtools in `production` mode only.
//
// Docs here https://github.com/zalmoxisus/redux-devtools-extension/blob/master/docs/API/Arguments.md
//
const composeEnhancers = composeWithDevTools({
    // actionSanitizer: ({ type }) => ({ type, payload: 'RESTRICTED' }),
    // autoPause: false,
    // features: {
    //    dispatch: false, // dispatch custom actions
    //    export: false, // export history of actions in a file
    //    import: false, // import history of actions from a file
    //    lock: true, // lock/unlock dispatching actions and side effects
    //    pause: true, // start/pause recording of dispatched actions
    //    persist: false, // persist states on page reloading
    //    reorder: true, // drag and drop actions in the history list
    //    skip: false, // skip (cancel) actions
    //    test: false, // generate tests for the selected actions
    // },
    // shouldCatchErrors: false,
    // shouldHotReload: false,
    // shouldRecordChanges: true,
    // stateSanitizer: state => ({ RESTRICTED: true }),
});

const getUserConfirmation = (message: string, callback: (confirm: boolean) => void) =>
    callback(window.confirm(message));

const history = createHashHistory({
    getUserConfirmation,
    hashType: 'noslash',
});

const middleware: Array<Middleware<any, any, any>> = [
    /* ... */
];
const createStoreWithMiddleware = composeEnhancers(applyMiddleware(...middleware))(createStore);

const store: Store = createStoreWithMiddleware(rootReducer);

export { history, store };
