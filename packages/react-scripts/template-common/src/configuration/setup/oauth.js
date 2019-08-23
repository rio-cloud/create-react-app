import { config } from '../../config';
import { trace } from './trace';
import { history } from './store';
import { routeStorage } from '../login/storage';
import { reportErrorToSentry } from './sentry';

const param = (window, regex, defaultValue = null) => {
    let result = defaultValue;
    decodeURI(window.location.href).replace(regex, (_, it) => {
        result = it;
    });
    return result;
};

const saveCurrentRoute = () => {
    const initialRoute = [window.location.hash, window.location.search].join('').replace(/^#/u, '');

    routeStorage.saveRoute(initialRoute);

    trace('saving initial route', initialRoute);
};

export const attemptInitialSignIn = userManager => {
    const isFreshRedirect = Boolean(param(window, /access_token=([^&]+)/u));

    return userManager
        .signinSilent()
        .then(user => {
            const initialRoute = routeStorage.getRoute();

            trace('initialRoute lookup', initialRoute);
            if (initialRoute) {
                trace(`history.replace("/${initialRoute}")`);
                history.replace(`/${initialRoute}`);
            }

            return Promise.resolve(user);
        })
        .catch(error => {
            trace('oidc.signinSilent failed, trying page redirect...', error);

            if (config.login.preventRedirect) {
                // eslint-disable-next-line no-console
                console.warn('[feature/login] redirect prevented due to config. Error was', error);
            } else if (isFreshRedirect) {
                trace('oidc.signinSilent.error', 'redirect prevented due to supsicious signin error', error);
                routeStorage.discardRoute();
                reportErrorToSentry(error);
            } else {
                saveCurrentRoute();
                userManager.signinRedirect();
            }

            trace('auth problem?', error);
            return Promise.reject(new Error(`Need to sign in`));
        });
};
