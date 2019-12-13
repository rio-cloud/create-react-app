const supportsLocalStorage = window => {
    try {
        const key = 'RIO_SUPPORTS_LOCAL_STORAGE';
        window.localStorage.setItem(key, true);
        const isSupported = window.localStorage.getItem(key);
        window.localStorage.removeItem(key);
        return isSupported;
    } catch (_) {
        // eslint-disable-next-line no-console
        console.warn('[feature/login] localStorage not supported!');

        // Not supported for some reason
        return false;
    }
};

export const configureStorage = window => {
    if (supportsLocalStorage(window)) {
        const { localStorage } = window;
        const routeKey = 'oauth_initial_route';
        return {
            discardRoute: () => localStorage.removeItem(routeKey),
            getRoute: () => localStorage.getItem(routeKey),
            saveRoute: route => localStorage.setItem(routeKey, route),
        };
    }
    // eslint-disable-next-line no-console, max-len
    console.warn('[feature/login] LocalStorage for saving "oauth_state" not available!');

    // This is bad, should we proceed and how?
    return {
        discardRoute: () => {},
        getRoute: () => '/',
        saveRoute: () => {},
    };
};

const getWindow = () => (typeof window === 'undefined' ? {} : window);

export const routeStorage = configureStorage(getWindow());
