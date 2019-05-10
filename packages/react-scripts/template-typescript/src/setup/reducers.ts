import { combineReducers } from 'redux';

import configReducer from './configReducer';
import langReducer from '../features/lang/reducer';
import appReducer from '../features/app/reducers/App.reducers';
import loginReducer from '../features/login/reducer';
import sessionReducer from '../features/login/sessionReducer';
import tokenHandlingReducer from '../features/tokenHandling/reducer';

export const rootReducer = combineReducers({
    config: configReducer,
    lang: langReducer,
    app: appReducer,
    login: loginReducer,
    session: sessionReducer,
    tokenHandling: tokenHandlingReducer,
});
