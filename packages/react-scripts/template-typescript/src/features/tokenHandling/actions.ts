import { ACCESS_TOKEN_STORED, AccessToken, ID_TOKEN_STORED, IdToken } from './types';

export function accessTokenStored(token: AccessToken) {
    return {
        payload: token,
        type: ACCESS_TOKEN_STORED,
    };
}

export function idTokenStored(token: IdToken) {
    return {
        payload: token,
        type: ID_TOKEN_STORED,
    };
}
