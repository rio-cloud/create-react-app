import { EVENT_USER_LANGUAGE_CHANGED, EVENT_USER_LOGGED_OUT, EVENT_USER_PROFILE_CHANGED } from 'rio-accountmenu';
import { config } from '../template/src/config';
import { extractLanguage, DEFAULT_LOCALE } from './lang/lang';
import langReducer from './lang/reducer';
import { getLanguageData, getLocale } from './lang/selectors';
import { configureFetchLanguageData } from './lang/services';
import { userProfileObtained, userSessionExpired, userSessionRenewed } from './login/actions';
import { mockOAuth, retrieveInitialState, setupOAuth, SIGNIN_REQUESTED } from './login/login';
import { redirectToLogout } from './login/logout';
import handleLoginRedirect from './login/redirect';
import loginReducer from './login/reducer';
import { isUserSessionExpired } from './login/selectors';
import sessionReducer from './login/sessionReducer';
import configReducer from './setup/configReducer';
import { history, store } from './setup/store';
import { accessToken } from './tokenHandling/accessToken';
import { accessTokenStored, idTokenStored } from './tokenHandling/actions';
import tokenHandlingReducer from './tokenHandling/reducer';
import { getAccessToken, getIdToken } from './tokenHandling/selectors';
import { reportErrorToSentry } from './setup/sentry';

const trace = process.env.NODE_ENV !== 'production' ? (...args) => console.log('[src/index]', ...args) : () => {};

const oauthBehavior = (settings) => {
    const isAllowedToMockAuth = process.env.NODE_ENV !== 'production';
    const promise = isAllowedToMockAuth && config.login.mockAuthorization ? mockOAuth(settings) : setupOAuth(settings);

    return promise.then(() => {
        const { initialRoute } = retrieveInitialState();

        trace('initialRoute lookup', initialRoute);
        if (initialRoute) {
            trace(`history.replace("/${initialRoute}")`);
            history.replace(`/${initialRoute}`);
        }

        return Promise.resolve();
    });
};

function main(renderFn) {
    const fetchLanguageData = configureFetchLanguageData(store);

    const onLogout = () => {
        accessToken.discardAccessToken();
        redirectToLogout();
    };

    const renewToken = (...args) => {
        trace('index.renewToken(', ...args, ')');
        const ev = new window.CustomEvent(SIGNIN_REQUESTED);
        document.dispatchEvent(ev);
    };

    document.addEventListener(EVENT_USER_LOGGED_OUT, onLogout);
    document.addEventListener(EVENT_USER_LANGUAGE_CHANGED, renewToken);
    document.addEventListener(EVENT_USER_PROFILE_CHANGED, renewToken);

    // We want the `<html lang>` attribute to be synced with the
    // language currently displayed
    store.subscribe(() => {
        const lang = extractLanguage(getLocale(store.getState()));
        const html = document.querySelector('html');

        if (html.getAttribute('lang') !== lang) {
            html.setAttribute('lang', lang);
        }
    });


    let renderApp = () => {
        renderApp = () => {};
        renderFn();
    };

    const oauthConfig = {
        onSessionError: (error) => {
            trace('index.onSessionError', error);
            reportErrorToSentry(error);
        },
        onTokenExpired: () => {
            trace('index.onTokenExpired');

            accessToken.discardAccessToken();
            store.dispatch(userSessionExpired());
        },
        onTokenRenewed: (result) => {
            trace('index.onTokenRenewed', result);

            accessToken.saveAccessToken(result.accessToken);
            store.dispatch(accessTokenStored(result.accessToken));
            store.dispatch(idTokenStored(result.idToken));
            store.dispatch(userProfileObtained(result.profile));

            store.dispatch(userSessionRenewed());

            // You will need to get the user language by yourself then
            // you may fetch the suitable messages from the CDN. Depending
            // on when and from where you fetch the user settings you might
            // want to employ a loading spinner while the request is ongoing.
            fetchLanguageData(result.locale).then(() => {
                trace(`Language data fetched for "${result.locale}"`);
                renderApp();
            }).catch((error) => {
                // eslint-disable-next-line no-console, max-len
                console.error(`Language data for "${result.locale}" could not be fetched.`, error);
                reportErrorToSentry(error);
            });
        },
    };

    oauthBehavior(oauthConfig).catch((error) => {
        trace('auth problem?', error);
    });
}

export {
    main,
    configReducer,
    getAccessToken,
    getIdToken,
    getLanguageData,
    getLocale,
    handleLoginRedirect,
    history,
    isUserSessionExpired,
    langReducer,
    loginReducer,
    sessionReducer,
    store,
    tokenHandlingReducer,
    DEFAULT_LOCALE
};
