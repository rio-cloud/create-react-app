/* eslint-disable camelcase */
import { UserManager } from 'oidc-client/lib/oidc-client';
import join from 'lodash/fp/join';
import getOr from 'lodash/fp/getOr';
import get from 'lodash/fp/get';

import { configureStorage } from './storage';
import { mapUserProfile } from './userProfile';
import { config } from '../../config';

export const SIGNIN_REQUESTED = 'rio.core.login.signinrequested';

const trace = process.env.NODE_ENV !== 'production' ? (...args) => console.log(`[oidcLogin]`, ...args) : () => {};

const getWindow = () => (typeof window === 'undefined' ? {} : window);

const param = (window, regex, defaultValue = null) => {
    let result = defaultValue;
    decodeURI(window.location.href).replace(regex, (_, it) => {
        result = it;
    });
    return result;
};

const pullLocale = getOr('en-GB', 'profile.locale');

export const adaptPublishedInfo = (result = {}) => ({
    accessToken: result.access_token,
    expiresInSeconds: result.expires_in,
    idToken: result.profile,
    locale: pullLocale(result),
    profile: mapUserProfile(result.profile),
});

export const configureAuth = (window, processEnv) => {
    const redirectUri = config.login.redirectUri;
    const silentRedirectUri = config.login.silentRedirectUri;

    const settings = {
        authority: `${config.login.authority}`,
        client_id: `${config.login.clientId}`,
        loadUserInfo: false,
        redirect_uri: `${redirectUri}`,
        response_type: `id_token token`,
        scope: join(' ', config.login.oauthScope),
        silent_redirect_uri: `${silentRedirectUri || redirectUri}`,
    };

    trace('oidc.auth.settings', settings);

    return new UserManager(settings);
};

export const configureSetupOAuth = (auth, storage, window, processEnv) => {
    const isFreshRedirect = Boolean(param(window, /access_token=([^&]+)/u));

    const saveCurrentRoute = () => {
        const initialRoute = [window.location.hash, window.location.search].join('').replace(/^#/u, '');

        storage.saveRoute(initialRoute);

        trace('saving initial route', initialRoute);
    };

    return oauthConfig => {
        const trySignin = () =>
            auth
                .signinSilent()
                .then(result => {
                    trace('oidc.signinSilent success!', result);
                    oauthConfig.onTokenRenewed(adaptPublishedInfo(result));

                    if (!isFreshRedirect) {
                        saveCurrentRoute();
                    }

                    return result;
                })
                .catch(error => {
                    trace('oidc.signinSilent failed', error);

                    if (!isFreshRedirect) {
                        saveCurrentRoute();
                    }

                    oauthConfig.onTokenExpired();
                    return Promise.reject(error);
                });

        if (get('document.addEventListener', window)) {
            window.document.addEventListener(SIGNIN_REQUESTED, () => {
                trace('[features/login/signinrequested] Trying to sign in silently...');
                trySignin()
                    .then(result => {
                        trace('[features/login/signinrequested] Re-Signin successful.', result);
                    })
                    .catch(error => {
                        trace('[features/login/signinrequested] Re-Signin failed.', error);
                    });
            });
        }

        auth.events.addAccessTokenExpiring((...args) => {
            trace('oidc.accessTokenExpiring', ...args);
            trace('  triggering manual silent renewal...');

            saveCurrentRoute();
            return trySignin();
        });

        auth.events.addAccessTokenExpired((...args) => {
            trace('oidc.accessTokenExpired', ...args);
            oauthConfig.onTokenExpired();
        });

        auth.events.addSilentRenewError(error => {
            trace('oidc.silentRenewError', error);
            oauthConfig.onSessionError(error);
            oauthConfig.onTokenExpired();
        });

        auth.events.addUserLoaded((...args) => {
            trace('oidc.userLoaded', ...args);
        });

        auth.events.addUserSignedOut((...args) => {
            trace('oidc.userSignedOut', ...args);
            oauthConfig.onTokenExpired();
        });

        return trySignin().catch(error => {
            trace('oidc.signinSilent failed, trying page redirect...', error);

            const mightBeSuspicious = isFreshRedirect;

            if (config.login.preventRedirect) {
                // eslint-disable-next-line no-console
                console.warn('[feature/login] redirect prevented due to config. Error was', error);
            } else if (mightBeSuspicious) {
                trace('oidc.signinSilent.error', 'redirect prevented due to supsicious signin error', error);
                storage.discardRoute();
                oauthConfig.onSessionError(error);
            } else {
                saveCurrentRoute();
                auth.signinRedirect();
            }

            return Promise.reject(new Error(`Need to sign in`));
        });
    };
};

const runtimeAuth = configureAuth(window, process.env);

export const setupOAuth = configureSetupOAuth(runtimeAuth, configureStorage(getWindow()), getWindow(), process.env);

export const mockOAuth = ({ onTokenRenewed }) => {
    // eslint-disable-next-line no-console
    console.warn(`[feature/login/oidc-session] Using mocked authorization due to config setting`);

    onTokenRenewed(
        adaptPublishedInfo({
            access_token: 'valid-mocked-oauth-bogus-token',
            // eslint-disable-next-line no-magic-numbers
            expires_in: 60 * 60 * 24 * 365,
            profile: {
                account: 'mockaccount',
                azp: 'test-client',
                email: 'test@example.com',
                family_name: 'Client',
                given_name: 'Test',
                locale: config.login.mockLocale,
                name: 'Test Client',
                sub: 'prod-rio-users:mock-user',
            },
        })
    );

    return Promise.resolve();
};

export const configureRetrieveInitialState = storage => () => ({
    initialRoute: storage.getRoute(),
});

export const retrieveInitialState = configureRetrieveInitialState(configureStorage(getWindow()));
