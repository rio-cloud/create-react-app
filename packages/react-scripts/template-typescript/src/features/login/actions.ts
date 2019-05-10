import { USER_PROFILE_OBTAINED, USER_SESSION_EXPIRED, USER_SESSION_RENEWED, UserProfileType } from './types';

export function userProfileObtained(profile: UserProfileType) {
    return {
        payload: profile,
        type: USER_PROFILE_OBTAINED,
    };
}

export function userSessionExpired() {
    return {
        type: USER_SESSION_EXPIRED,
    };
}

export function userSessionRenewed() {
    return {
        type: USER_SESSION_RENEWED,
    };
}
