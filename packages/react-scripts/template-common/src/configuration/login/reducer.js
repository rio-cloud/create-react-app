import {
    USER_PROFILE_OBTAINED,
    USER_SESSION_EXPIRED,
    USER_SESSION_RENEWED,
} from './actions';

const initialState = {
    hasUserSessionEverExpired: false,
    userProfile: null,
    userSessionExpired: false,
};

const reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case USER_PROFILE_OBTAINED:
            return {
                ...state,
                userProfile: action.payload,
            };
        case USER_SESSION_EXPIRED:
            return {
                ...state,
                hasUserSessionEverExpired: true,
                userSessionExpired: true,
            };
        case USER_SESSION_RENEWED:
            return {
                ...state,
                userSessionExpired: false,
            };
        default:
            return state;
    }
};

export default reducer;
