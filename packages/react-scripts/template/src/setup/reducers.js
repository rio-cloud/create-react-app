import { combineReducers } from 'redux';

import configReducer from './configReducer';
import appReducer from '../features/app/reducer';
import langReducer from '../features/lang/reducer';
import loginReducer from '../features/login/reducer';
import sessionReducer from '../features/login/sessionReducer';
import tokenHandlingReducer from '../features/tokenHandling/reducer';

export const rootReducer = combineReducers({
    app: appReducer,
    config: configReducer,
    lang: langReducer,
    login: loginReducer,
    session: sessionReducer,
    tokenHandling: tokenHandlingReducer,
});
