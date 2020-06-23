import { EVENT_USER_LANGUAGE_CHANGED, EVENT_USER_PROFILE_CHANGED } from 'rio-user-menu';
import { extractLanguage, DEFAULT_LOCALE } from './lang/lang';
import langReducer from './lang/reducer';
import { getDisplayMessages, getLocale } from './lang/selectors';
import { configureFetchDisplayMessages } from './lang/services';
import { userProfileObtained, userSessionExpired, userSessionRenewed } from './login/actions';
import { configureMockUserManager, configureUserManager, createUserManager } from './login/login';
import handleLoginRedirect from './login/redirect';
import loginReducer from './login/reducer';
import { isUserSessionExpired, getUserAccount } from './login/selectors';
import configReducer from './setup/configReducer';
import { history, store } from './setup/store';
import { accessToken } from './tokenHandling/accessToken';
import { accessTokenStored, idTokenStored } from './tokenHandling/actions';
import tokenHandlingReducer from './tokenHandling/reducer';
import { getAccessToken, getIdToken } from './tokenHandling/selectors';
import { trace } from './setup/trace';
import { attemptInitialSignIn } from './setup/oauth';
import { config } from '../config';

function main(renderApp) {
    const fetchDisplayMessages = configureFetchDisplayMessages(store);

    // We want the `<html lang>` attribute to be synced with the
    // language currently displayed
    store.subscribe(() => {
        const lang = extractLanguage(getLocale(store.getState()));
        const html = document.querySelector('html');

        if (html.getAttribute('lang') !== lang) {
            html.setAttribute('lang', lang);
        }
    });

    const oauthConfig = {
        onSessionExpired: () => {
            accessToken.discardAccessToken();
            store.dispatch(userSessionExpired());
        },
        onSessionRenewed: result => {
            trace('index.onTokenRenewed', result);

            accessToken.saveAccessToken(result.accessToken);
            store.dispatch(accessTokenStored(result.accessToken));
            store.dispatch(idTokenStored(result.idToken));
            store.dispatch(userProfileObtained(result.profile));

            store.dispatch(userSessionRenewed());

            // You will need to get the user language by yourself then
            // you may fetch the suitable messages. Depending
            // on when and from where you fetch the user settings you might
            // want to employ a loading spinner while the request is ongoing.
            fetchDisplayMessages(result.locale);
        },
    };

    const isAllowedToMockAuth = process.env.NODE_ENV !== 'production';
    const userManager =
        isAllowedToMockAuth && config.login.mockAuthorization
            ? configureMockUserManager(oauthConfig)
            : configureUserManager(oauthConfig, createUserManager());

    document.addEventListener(EVENT_USER_LANGUAGE_CHANGED, userManager.signinSilent.bind(userManager));
    document.addEventListener(EVENT_USER_PROFILE_CHANGED, userManager.signinSilent.bind(userManager));

    attemptInitialSignIn(userManager)
        .then(renderApp)
        .catch(error => {
            trace('could not start application', error);
        });
}

export {
    main,
    configReducer,
    getAccessToken,
    getIdToken,
    getDisplayMessages,
    getLocale,
    getUserAccount,
    handleLoginRedirect,
    history,
    isUserSessionExpired,
    langReducer,
    loginReducer,
    store,
    tokenHandlingReducer,
    DEFAULT_LOCALE,
};
