import { combineReducers } from 'redux';
import {History} from "history";
import { configReducer, langReducer, loginReducer, sessionReducer /*, tokenHandlingReducer*/ } from './configuration';
import tokenHandlingReducer from './configuration/tokenHandling/reducer'; // TODO make import from ./configuration work
import appReducer from './features/app/reducers/App.reducers';
import {connectRouter} from "connected-react-router";

export const rootReducer = (history: History) =>  combineReducers({
    config: configReducer,
    lang: langReducer,
    app: appReducer,
    login: loginReducer,
    session: sessionReducer,
    router: connectRouter(history),
    tokenHandling: tokenHandlingReducer,
});
