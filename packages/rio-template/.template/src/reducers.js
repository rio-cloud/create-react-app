import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { configReducer, langReducer, loginReducer /*, tokenHandlingReducer*/ } from './configuration';
import tokenHandlingReducer from './configuration/tokenHandling/reducer'; // TODO make import from ./configuration work
import appReducer from './features/app/reducer';

export const rootReducer = history =>
    combineReducers({
        app: appReducer,
        config: configReducer,
        lang: langReducer,
        login: loginReducer,
        tokenHandling: tokenHandlingReducer,
        router: connectRouter(history),
    });
