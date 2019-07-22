import { config } from '../../config';

export const configureRedirectToLogout = (window, processEnv) => {
    const { logoutUri } = config;

    return () => {
        // eslint-disable-next-line immutable/no-mutation
        window.location.href = logoutUri;
    };
};

export const redirectToLogout = configureRedirectToLogout(window, process.env);
