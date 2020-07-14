export interface ConfigState {
    backend: {
        AUTHENTICATION_SERVICE: string | undefined;
        MENU_SERVICE: string | undefined;
    };
    homeRoute: string | undefined;
    id: string | undefined;
    login: {
        authority: string | undefined;
        clientId: string | undefined;
        oauthScope: Array<string>;
        mockAuthorization: boolean;
        mockLocale: string | undefined;
        preventRedirect: boolean;
        redirectUri: string | undefined;
        silentRedirectUri: string | undefined;
    };
    logoutUri: string | undefined;
    sentryToken: string;
}

const getBoolEnvValue = (envValue: string): boolean => {
    return typeof process.env[envValue] !== 'undefined' && process.env[envValue] === 'true';
};

export const config: ConfigState = {
    backend: {
        AUTHENTICATION_SERVICE: process.env.REACT_APP_AUTHENTICATION_SERVICE,
        MENU_SERVICE: process.env.REACT_APP_MENU_SERVICE,
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
