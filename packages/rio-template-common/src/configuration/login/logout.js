import { config } from '../../config';

export const configureRedirectToLogout = (window, processEnv) => {
    const { logoutUri } = config;

    return () => {
        window.location.href = logoutUri;
    };
};

export const redirectToLogout = configureRedirectToLogout(window, process.env);
