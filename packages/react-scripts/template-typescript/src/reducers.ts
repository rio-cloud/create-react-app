import { combineReducers } from 'redux';

import { configReducer, langReducer, loginReducer, sessionReducer, tokenHandlingReducer } from './configuration';
import appReducer from './features/app/reducers/App.reducers';

export const rootReducer = combineReducers({
    config: configReducer,
    lang: langReducer,
    app: appReducer,
    login: loginReducer,
    session: sessionReducer,
    tokenHandling: tokenHandlingReducer,
});
