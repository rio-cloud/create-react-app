import { CHANGE_LOCALE, FETCH_LANGUAGE_DATA, LANGUAGE_DATA_FETCHED, LanguageDataInterface } from './types';

export function changeLocale(locale: string) {
    return {
        payload: locale,
        type: CHANGE_LOCALE,
    };
}

export function fetchLanguageData(locale: string) {
    return {
        payload: locale,
        type: FETCH_LANGUAGE_DATA,
    };
}

export function languageDataFetched(locale: string, languageData: LanguageDataInterface) {
    return {
        type: LANGUAGE_DATA_FETCHED,
        payload: {
            locale,
            languageData,
        },
    };
}
