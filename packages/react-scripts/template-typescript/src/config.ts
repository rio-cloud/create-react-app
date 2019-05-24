import { ConfigState } from './types';

export const Config: ConfigState = {
    backend: {
        APP_REGISTRY: process.env.REACT_APP_APP_REGISTRY,
        AUTHENTICATION_SERVICE: process.env.REACT_APP_AUTHENTICATION_SERVICE,
        USERADMIN_SERVICE: process.env.REACT_APP_USERADMIN_SERVICE,
        USER_SETTINGS_SERVICE: process.env.REACT_APP_USER_SETTINGS_SERVICE,
    },
    homeRoute: process.env.REACT_APP_HOME_ROUTE,
    id: process.env.REACT_APP_ID,
    login: {
        authority: process.env.REACT_APP_LOGIN_AUTHORITY,
        // TODO: Request and supply your App's `client_id` as
        //       well as the needed OAuth scopes here
        clientId: '<you-need-to-obtain-your-own-client-id>',
        oauthScope: ['openid', 'profile', 'email'],
        mockAuthorization: getBoolEnvValue('REACT_APP_LOGIN_MOCK_AUTHORIZATION'),
        mockLocale: process.env.REACT_APP_LOGIN_MOCK_LOCALE,
        preventRedirect: getBoolEnvValue('REACT_APP_LOGIN_PREVENT_REDIRECT'),
        redirectUri: process.env.REACT_APP_LOGIN_REDIRECT_URI,
        silentRedirectUri: process.env.REACT_APP_LOGIN_SILENT_REDIRECT_URI,
    },
    logoutUri: process.env.REACT_APP_LOGOUT_URI,
    // TODO: Create a project in Sentry and use the token here
    sentryToken: '<you-need-to-obtain-your-own-sentry-token>',
};

function getBoolEnvValue(envValue: string): boolean {
    return typeof process.env[envValue] !== 'undefined' && process.env[envValue] === 'true';
}
