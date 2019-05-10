import {
    LoginActionTypes,
    LoginState,
    USER_PROFILE_OBTAINED,
    USER_SESSION_EXPIRED,
    USER_SESSION_RENEWED,
} from './types';

const initialState: LoginState = {
    hasUserSessionEverExpired: false,
    userProfile: null,
    userSessionExpired: false,
};

export default function reducer(state: LoginState = initialState, action: LoginActionTypes): LoginState {
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
}
