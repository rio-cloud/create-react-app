import { combineReducers } from 'redux';

import { configReducer, langReducer, loginReducer, sessionReducer /*, tokenHandlingReducer*/ } from './configuration';
import tokenHandlingReducer from './configuration/tokenHandling/reducer'; // TODO make import from ./configuration work
import appReducer from './features/app/reducers/App.reducers';

export const rootReducer = combineReducers({
    config: configReducer,
    lang: langReducer,
    app: appReducer,
    login: loginReducer,
    session: sessionReducer,
    tokenHandling: tokenHandlingReducer,
});
