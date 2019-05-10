import { HIDE_SESSION_EXPIRED_DIALOG } from './actions';

const initialState = {
    sessionExpiredAcknowledged: false,
};

const reducer = (state = initialState, action = {}) => {
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
