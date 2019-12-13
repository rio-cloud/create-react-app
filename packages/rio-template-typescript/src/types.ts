import { AppState } from './features/app/reducers/types';
import { AccessTokenState, LanguageState, LoginState } from './configuration';

export interface State {
    tokenHandling?: AccessTokenState;
    login?: LoginState;
    lang?: LanguageState;
    config?: ConfigState;
    app: AppState;
}

export interface ConfigState {
    backend: {
        AUTHENTICATION_SERVICE: string | undefined;
        USERADMIN_SERVICE: string | undefined;
        USER_SETTINGS_SERVICE: string | undefined;
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
