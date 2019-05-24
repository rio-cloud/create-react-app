
export const USER_PROFILE_OBTAINED = 'login/USER_PROFILE_OBTAINED';
export const USER_SESSION_EXPIRED = 'login/USER_SESSION_EXPIRED';
export const USER_SESSION_RENEWED = 'login/USER_SESSION_RENEWED';

export const userProfileObtained = (profile) => ({
    payload: profile,
    type: USER_PROFILE_OBTAINED,
});

export const userSessionExpired = () => ({
    type: USER_SESSION_EXPIRED,
});

export const userSessionRenewed = () => ({
    type: USER_SESSION_RENEWED,
});
