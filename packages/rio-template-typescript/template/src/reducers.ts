import { combineReducers } from 'redux';
import { History } from 'history';
import {
    AccessTokenState,
    configReducer,
    langReducer, LanguageState,
    loginReducer,
    LoginState /*, tokenHandlingReducer*/
} from './configuration';
import tokenHandlingReducer from './configuration/tokenHandling/reducer'; // TODO make import from ./configuration work
import appReducer, {AppState} from './features/app/App.reducers';
import { connectRouter } from 'connected-react-router';
import {ConfigState} from "./config";

export interface State {
    tokenHandling?: AccessTokenState;
    login?: LoginState;
    lang?: LanguageState;
    config?: ConfigState;
    app: AppState;
}

export const rootReducer = (history: History) =>
    combineReducers({
        config: configReducer,
        lang: langReducer,
        app: appReducer,
        login: loginReducer,
        router: connectRouter(history),
        tokenHandling: tokenHandlingReducer,
    });
