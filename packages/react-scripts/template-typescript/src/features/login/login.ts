import { User, UserManager } from 'oidc-client';
import join from 'lodash/fp/join';
import getOr from 'lodash/fp/getOr';
import get from 'lodash/fp/get';

import { configureStorage } from './storage';
import { mapUserProfile } from './userProfile';
import { ConfigState } from '../../setup/types';
import { Config } from '../../setup/config';
import { AuthStorage, MockUser, OAuthConfig, OAuthPublishedInfo } from './types';

export const SIGNIN_REQUESTED = 'rio.core.login.signinrequested';

const trace = process.env.NODE_ENV !== 'production' ? (...args: Array<any>) => console.log('[oidcLogin]', ...args) : () => {};

const param: (a: Window, b: RegExp, c?: string | null) => string | null = (window: Window, regex: RegExp, defaultValue = null) => {
    let result = defaultValue;
    decodeURI(window.location.href).replace(regex, (_, it) => {
        result = it;

        return ''; // TODO use regex search instead of replace
    });
    return result;
};

function pullLocale(result: User | MockUser): string {
    return getOr('en-GB', 'profile.locale', result);
}

export function adaptPublishedInfo(result: User | MockUser): OAuthPublishedInfo {
    return {
        accessToken: result.access_token,
        expiresInSeconds: result.expires_in,
        idToken: result.profile,
        locale: pullLocale(result),
        profile: mapUserProfile(result.profile),
    };
}

export const configureAuth: (a: ConfigState) => UserManager = (runTimeConfig: ConfigState) => {
    const redirectUri = runTimeConfig.login.redirectUri;
    const silentRedirectUri = runTimeConfig.login.silentRedirectUri;

    const settings = {
        authority: `${runTimeConfig.login.authority}`,
        client_id: `${runTimeConfig.login.clientId}`,
        loadUserInfo: false,
        redirect_uri: `${redirectUri}`,
        response_type: 'id_token token',
        scope: join(' ', runTimeConfig.login.oauthScope),
        silent_redirect_uri: `${silentRedirectUri || redirectUri}`,
    };

    trace('oidc.auth.settings', settings);

    return new UserManager(settings);
};

export const configureSetupOAuth = (auth: UserManager, storage: AuthStorage, window: Window, runTimeConfig: ConfigState) => {
    const isFreshRedirect = Boolean(param(window, /access_token=([^&]+)/u));

    const saveCurrentRoute = () => {
        const initialRoute = [window.location.hash, window.location.search].join('').replace(/^#/u, '');

        storage.saveRoute(initialRoute);

        trace('saving initial route', initialRoute);
    };

    return (config: OAuthConfig) => {
        const trySignin = () =>
            auth
                .signinSilent()
                .then((result: User) => {
                    trace('oidc.signinSilent success!', result);
                    config.onTokenRenewed(adaptPublishedInfo(result));

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

                    config.onTokenExpired();
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
            config.onTokenExpired();
        });

        auth.events.addSilentRenewError(error => {
            trace('oidc.silentRenewError', error);
            config.onSessionError(error);
            config.onTokenExpired();
        });

        auth.events.addUserLoaded((...args) => {
            trace('oidc.userLoaded', ...args);
        });

        auth.events.addUserSignedOut((...args) => {
            trace('oidc.userSignedOut', ...args);
            config.onTokenExpired();
        });

        return trySignin().catch(error => {
            trace('oidc.signinSilent failed, trying page redirect...', error);

            const mightBeSuspicious = isFreshRedirect;

            if (runTimeConfig.login.preventRedirect) {
                // eslint-disable-next-line no-console
                console.warn('[feature/login] redirect prevented due to config. Error was', error);
            } else if (mightBeSuspicious) {
                trace('oidc.signinSilent.error', 'redirect prevented due to supsicious signin error', error);
                storage.discardRoute();
                config.onSessionError(error);
            } else {
                saveCurrentRoute();
                auth.signinRedirect();
            }

            return Promise.reject(new Error('Need to sign in'));
        });
    };
};

const runtimeAuth = configureAuth(Config);

trace('runtimeAuth', runtimeAuth);

export const setupOAuth: (c: OAuthConfig) => Promise<User> = configureSetupOAuth(runtimeAuth, configureStorage(window), window, Config);

export const mockOAuth: (c: OAuthConfig) => Promise<User> = config => {
    // eslint-disable-next-line no-console
    console.warn('[feature/login/oidc-session] Using mocked authorization due to config setting');
    const accessToken = 'valid-mocked-oauth-bogus-token';

    config.onTokenRenewed(
        adaptPublishedInfo({
            access_token: accessToken,
            expires_in: 60 * 60 * 24 * 365,
            profile: {
                account: 'mockaccount',
                azp: 'test-client',
                email: 'test@example.com',
                family_name: 'Client',
                given_name: 'Test',
                locale: Config.login.mockLocale,
                name: 'Test Client',
                sub: 'prod-rio-users:mock-user',
            },
        })
    );

    const mockSettings = {
        id_token: 'id_token',
        session_state: 'session_state',
        access_token: accessToken,
        refresh_token: 'refresh_token',
        token_type: 'token_type',
        scope: 'scope',
        profile: {},
        expires_at: 0,
        state: '',
    };

    return Promise.resolve(new User(mockSettings));
};

export const configureRetrieveInitialState = (storage: AuthStorage) => () => ({
    initialRoute: storage.getRoute(),
});

export const retrieveInitialState = configureRetrieveInitialState(configureStorage(window));
