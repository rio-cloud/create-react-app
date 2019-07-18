import { createHashHistory } from 'history';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { rootReducer } from '../../reducers';

const history = createHashHistory({
    hashType: 'noslash',
});

function configureStore(preloadedState) {
    const middlewares = [thunkMiddleware, routerMiddleware(history)];
    const middlewareEnhancer = applyMiddleware(...middlewares);

    const enhancers = [middlewareEnhancer];
    const composedMiddleware = composeWithDevTools(...enhancers);

    return createStore(
        rootReducer(history),
        preloadedState,
        composedMiddleware
    );
}

const store = configureStore();

export { history, store };
