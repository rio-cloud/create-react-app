import { configureStorage } from './storage';
import { AccessToken, AccessTokenStorageInterface } from './types';

export const extractAccessTokenFromWindowLocation = (window: Window | null): AccessToken => {
    if (!window || !window.location || !window.location.href) {
        return undefined;
    }

    // tslint-disable-next-line immutable/no-let
    let token;
    window.location.href.replace(/access_token=([^&]+)/u, (_, it) => {
        token = it;

        return ''; // TODO use regex search in string instead of replace syntax
    });

    return token;
};

export const configureAccessToken = (
    window: Window | null,
    storage: AccessTokenStorageInterface
): AccessTokenStorageInterface => {
    const urlToken = extractAccessTokenFromWindowLocation(window);

    if (urlToken) {
        storage.saveAccessToken(urlToken);
    }

    return storage;
};

export const accessToken: AccessTokenStorageInterface = configureAccessToken(
    typeof window === 'undefined' ? null : window,
    configureStorage()
);
