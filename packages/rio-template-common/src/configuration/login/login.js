/* eslint-disable camelcase */
import { UserManager } from 'oidc-client/lib/oidc-client';
import join from 'lodash/fp/join';
import getOr from 'lodash/fp/getOr';
import { mapUserProfile } from './userProfile';
import { config } from '../../config';
import { reportErrorToSentry } from '../setup/sentry';

const trace = process.env.NODE_ENV !== 'production' ? (...args) => console.log(`[oidcLogin]`, ...args) : () => {};

const pullLocale = getOr('en-GB', 'profile.locale');

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
    };

    trace('oidc.auth.settings', settings);

    return new UserManager(settings);
};

export const configureUserManager = (oauthConfig, userManager) => {
    userManager.events.addUserLoaded(user => {
        trace('oidc.signinSilent success!');
        oauthConfig.onTokenRenewed(adaptPublishedInfo(user));
    });

    userManager.events.addUserUnloaded(() => {
        oauthConfig.onTokenExpired();
    });

    userManager.events.addAccessTokenExpiring((...args) => {
        trace('oidc.accessTokenExpiring', ...args);
        trace('  triggering manual silent renewal...');
        userManager.signinSilent();
    });

    userManager.events.addAccessTokenExpired((...args) => {
        trace('oidc.accessTokenExpired', ...args);
        oauthConfig.onTokenExpired();
    });

    userManager.events.addSilentRenewError(error => {
        trace('oidc.silentRenewError', error);
        reportErrorToSentry(error);

        oauthConfig.onTokenExpired();
    });

    userManager.events.addUserSignedOut((...args) => {
        trace('oidc.userSignedOut', ...args);
        oauthConfig.onTokenExpired();
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
