import { AuthStorage } from './types';

const supportsLocalStorage: (a: Window) => boolean = window => {
    try {
        const key = 'RIO_SUPPORTS_LOCAL_STORAGE';
        window.localStorage.setItem(key, 'true');
        window.localStorage.removeItem(key);
        return true;
    } catch (_) {
        console.warn('[feature/login] localStorage not supported!');

        // Not supported for some reason
        return false;
    }
};

export const configureStorage: (a: Window) => AuthStorage = window => {
    if (supportsLocalStorage(window)) {
        const { localStorage } = window;
        const routeKey = 'oauth_initial_route';
        return {
            discardRoute: () => localStorage.removeItem(routeKey),
            getRoute: () => localStorage.getItem(routeKey),
            saveRoute: route => localStorage.setItem(routeKey, route),
        };
    }
    console.warn('[feature/login] LocalStorage for saving "oauth_state" not available!');

    // This is bad, should we proceed and how?
    return {
        discardRoute: () => {},
        getRoute: () => '/',
        saveRoute: r => {},
    };
};
