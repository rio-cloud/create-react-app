export type AccessToken = string | undefined | null;
export interface IdToken {
    sub: string;
    azp: string;
    account: string;
    given_name: string;
    family_name: string;
    name: string;
    locale: string;
    email: string;
}

export interface AccessTokenStorageInterface {
    discardAccessToken: () => void;
    getAccessToken: () => AccessToken;
    hasAccessToken: () => boolean;
    saveAccessToken: (token: AccessToken) => void;
}

export const ACCESS_TOKEN_STORED = 'tokenHandling/ACCESS_TOKEN_STORED';
export const ID_TOKEN_STORED = 'tokenHandling/ID_TOKEN_STORED';

interface AccessTokenStoredAction {
    type: typeof ACCESS_TOKEN_STORED;
    payload: AccessToken;
}

interface IdTokenStoredAction {
    type: typeof ID_TOKEN_STORED;
    payload: IdToken;
}

export interface AccessTokenState {
    accessToken: AccessToken;
    idToken: IdToken | null;
}

export type AccessTokenActionTypes = AccessTokenStoredAction | IdTokenStoredAction;
