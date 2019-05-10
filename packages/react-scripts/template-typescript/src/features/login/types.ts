import { AccessToken, IdToken } from '../tokenHandling/types';

export interface UserProfileType {
    email?: string;
    givenName?: string;
    familyName?: string;
    locale: string;
}

export interface AuthStorage {
    discardRoute: () => void;
    getRoute: () => string | null;
    saveRoute: (a: string) => void;
}

export interface MockUser {
    access_token: AccessToken;
    expires_in: number;
    profile: {
        locale: string | undefined;
    };
}

export interface OAuthPublishedInfo {
    accessToken: AccessToken;
    idToken: IdToken;
    expiresInSeconds: number | undefined;
    locale: string;
    profile: UserProfileType;
}

export interface OAuthConfig {
    onSessionError: (e: Error) => void;
    onTokenExpired: () => void;
    onTokenRenewed: (r: OAuthPublishedInfo) => void;
}

export interface LoginState {
    hasUserSessionEverExpired: boolean;
    userProfile: UserProfileType | null;
    userSessionExpired: boolean;
}

export interface SessionState {
    errorMessage: string;
    hasUserInfo: boolean;
    isLoggedIn: boolean;
    showError: boolean;
    userInfo: {
        email?: string;
        firstName?: string;
        lastName?: string;
        roles: Array<string>;
    } | null;
}

export const USER_PROFILE_OBTAINED = 'login/USER_PROFILE_OBTAINED';
export const USER_SESSION_EXPIRED = 'login/USER_SESSION_EXPIRED';
export const USER_SESSION_RENEWED = 'login/USER_SESSION_RENEWED';

interface UserProfileObtainedAction {
    type: typeof USER_PROFILE_OBTAINED;
    payload: UserProfileType;
}

interface UserSessionExpiredAction {
    type: typeof USER_SESSION_EXPIRED;
    payload: undefined | null;
}

interface UserSessionRenewedAction {
    type: typeof USER_SESSION_RENEWED;
    payload: undefined | null;
}

export type LoginActionTypes = UserProfileObtainedAction | UserSessionExpiredAction | UserSessionRenewedAction;
