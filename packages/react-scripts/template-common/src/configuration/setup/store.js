import { createHashHistory } from 'history';
import thunkMiddleware from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'connected-react-router';

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
