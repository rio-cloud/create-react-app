import { Store } from 'redux';
import { History } from 'history';

type IdToken = {
    sub: string;
    azp: string;
    account: string;
    given_name: string;
    family_name: string;
    name: string;
    locale: string;
    email: string;
}

type AccessToken = string | undefined | null;

type UserProfileType = {
    email?: string;
    givenName?: string;
    familyName?: string;
    locale: string;
}

interface LanguageDataInterface {
    [key: string]: string;
}

interface MessagesInterface {
    [key: string]: LanguageDataInterface;
}

interface AccessTokenState {
    accessToken: AccessToken;
    idToken: IdToken | null;
}

interface LanguageState {
    allMessages: MessagesInterface;
    canFetchSupportedLocale?: boolean;
    displayMessages?: LanguageDataInterface;
    displayLocale?: string;
    preferredLocale?: string;
    supportedLocale?: string;
}

interface LoginState {
    hasUserSessionEverExpired: boolean;
    userProfile: UserProfileType | null;
    userSessionExpired: boolean;
}

interface SessionState {
    errorMessage: string;
    hasUserInfo: boolean;
    isLoggedIn: boolean;
    showError: boolean;
    userInfo: {
        email?: string;
        firstName?: string;
        lastName?: string;
        roles: Array<string>;
    } | null;
}

interface GenericActionInterface {
    type?: string;
    payload?: any;
}

declare function configReducer(state: any, action: GenericActionInterface): any
declare function langReducer(state: any, action: GenericActionInterface): any
declare function loginReducer(state: any, action: GenericActionInterface): any
declare function sessionReducer(state: any, action: GenericActionInterface): any
declare function tokenHandlingReducer(state: any, action: GenericActionInterface): any

declare function handleLoginRedirect(): void
declare function main(renderFn: () => void): void
declare function getAccessToken(state: any): AccessToken
declare function getIdToken(state: any): IdToken
declare function isUserSessionExpired(state: any): boolean
declare function getLanguageData(state: any): LanguageDataInterface
declare function getLocale(state: any): string
declare function getUserAccount(state: any): string | null;

declare const store: Store;
declare const history: History<any>;
declare const DEFAULT_LOCALE: string;

export {
    main,
    handleLoginRedirect,
    configReducer,
    getAccessToken,
    getIdToken,
    getLanguageData,
    getLocale,
    getUserAccount,
    history,
    isUserSessionExpired,
    langReducer,
    loginReducer,
    sessionReducer,
    store,
    tokenHandlingReducer,
    AccessToken,
    AccessTokenState,
    IdToken,
    LanguageDataInterface,
    LanguageState,
    LoginState,
    MessagesInterface,
    SessionState,
    UserProfileType,
    DEFAULT_LOCALE
}
