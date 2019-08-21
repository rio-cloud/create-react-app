import { configureStorage } from './storage';

export const extractAccessTokenFromWindowLocation = window => {
    if (!window || !window.location || !window.location.href) {
        return undefined;
    }

    if (typeof window.location.href !== 'string') {
        return undefined;
    }

    let token;
    window.location.href.replace(/access_token=([^&]+)/u, (_, it) => {
        token = it;
    });

    return token;
};

export const configureAccessToken = (window, storage) => {
    const urlToken = extractAccessTokenFromWindowLocation(window);

    if (urlToken) {
        storage.saveAccessToken(urlToken);
    }

    return storage;
};

export const accessToken = configureAccessToken(typeof window === 'undefined' ? null : window, configureStorage());
