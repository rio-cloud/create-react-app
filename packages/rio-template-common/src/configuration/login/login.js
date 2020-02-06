/* eslint-disable camelcase */
import { UserManager } from 'oidc-client/lib/oidc-client';
import join from 'lodash/fp/join';
import getOr from 'lodash/fp/getOr';
import { mapUserProfile } from './userProfile';
import { config } from '../../config';

const pullLocale = getOr('en-GB', 'profile.locale');

const RETRY_SIGNIN_TIMEOUT_IN_MS = 30000;

const retrySigninSilent = (oauthConfig, userManager) => {
    userManager.signinSilent().catch(error => {
        if (error.message === 'login_required') {
            oauthConfig.onSessionExpired();
        } else {
            setTimeout(() => retrySigninSilent(oauthConfig, userManager), RETRY_SIGNIN_TIMEOUT_IN_MS);
        }
    });
};

export const adaptPublishedInfo = (result = {}) => ({
    accessToken: result.access_token,
    expiresInSeconds: result.expires_in,
    idToken: result.profile,
    locale: pullLocale(result),
    profile: mapUserProfile(result.profile),
});

export const createUserManager = () => {
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
        includeIdTokenInSilentRenew: false,
        automaticSilentRenew: true,
    };

    return new UserManager(settings);
};

export const configureUserManager = (oauthConfig, userManager) => {
    userManager.events.addUserLoaded(user => {
        oauthConfig.onSessionRenewed(adaptPublishedInfo(user));
    });

    userManager.events.addUserUnloaded(() => {
        oauthConfig.onSessionExpired();
    });

    userManager.events.addSilentRenewError(() => {
        retrySigninSilent(oauthConfig, userManager);
    });

    userManager.events.addUserSignedOut((...args) => {
        oauthConfig.onSessionExpired();
    });

    return userManager;
};

export const configureMockUserManager = ({ onTokenRenewed }) => {
    // eslint-disable-next-line no-console
    console.warn(`[feature/login/oidc-session] Using mocked authorization due to config setting`);

    const signinSilent = () => {
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
    return { signinSilent };
};
