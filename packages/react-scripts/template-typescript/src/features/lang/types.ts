export interface LanguageDataInterface {
    [key: string]: string;
}
export interface MessagesInterface {
    [key: string]: LanguageDataInterface;
}

export interface LanguageState {
    allMessages: MessagesInterface;
    canFetchSupportedLocale?: boolean;
    displayMessages?: LanguageDataInterface;
    displayLocale?: string;
    preferredLocale?: string;
    supportedLocale?: string;
}

export const CHANGE_LOCALE = 'lang/CHANGE_LOCALE';
export const FETCH_LANGUAGE_DATA = 'lang/FETCH_LANGUAGE_DATA';
export const LANGUAGE_DATA_FETCHED = 'lang/LANGUAGE_DATA_FETCHED';

interface ChangeLocaleAction {
    type: typeof CHANGE_LOCALE;
    payload: string;
}

interface FetchLanguageDataAction {
    type: typeof FETCH_LANGUAGE_DATA;
    payload: string;
}

interface LanguageDataFetchedAction {
    type: typeof LANGUAGE_DATA_FETCHED;
    payload: {
        locale: string;
        languageData: LanguageDataInterface;
    };
}

export type LanguageActionTypes = ChangeLocaleAction | FetchLanguageDataAction | LanguageDataFetchedAction;
