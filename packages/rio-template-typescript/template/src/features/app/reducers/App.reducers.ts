import { AppActions, HIDE_SESSION_EXPIRED_DIALOG } from '../actions/types';
import { AppState } from './types';

const initialState: AppState = {
    sessionExpiredAcknowledged: false,
};

const reducer = (state: AppState = initialState, action: AppActions): AppState => {
    switch (action.type) {
        case HIDE_SESSION_EXPIRED_DIALOG:
            return {
                ...state,
                sessionExpiredAcknowledged: true,
            };
        default:
            return state;
    }
};

export default reducer;
