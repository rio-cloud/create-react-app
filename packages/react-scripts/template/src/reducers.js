import { combineReducers } from 'redux';
import { configReducer, langReducer, loginReducer, sessionReducer, tokenHandlingReducer } from '../../configuration';
import appReducer from './features/app/reducer';

export const rootReducer = combineReducers({
    app: appReducer,
    config: configReducer,
    lang: langReducer,
    login: loginReducer,
    session: sessionReducer,
    tokenHandling: tokenHandlingReducer,
});
