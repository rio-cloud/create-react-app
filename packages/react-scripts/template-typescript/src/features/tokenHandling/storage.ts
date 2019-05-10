import { AccessToken, AccessTokenStorageInterface } from './types';

export const configureStorage = (): AccessTokenStorageInterface => {
    let accessToken: AccessToken = null;
    return {
        discardAccessToken: () => {
            accessToken = null;
        },
        getAccessToken: () => accessToken,
        hasAccessToken: () => Boolean(accessToken),
        saveAccessToken: token => {
            accessToken = token;
        },
    };
};
