
export const CHANGE_LOCALE = 'lang/CHANGE_LOCALE';

export const changeLocale = (locale) => ({
    payload: locale,
    type: CHANGE_LOCALE,
});

export const FETCH_LANGUAGE_DATA = 'lang/FETCH_LANGUAGE_DATA';

export const fetchLanguageData = (locale) => ({
    payload: locale,
    type: FETCH_LANGUAGE_DATA,
});

export const LANGUAGE_DATA_FETCHED = 'lang/LANGUAGE_DATA_FETCHED';

export const languageDataFetched = (locale, languageData) => ({
    payload: {
        locale,
        languageData,
    },
    type: LANGUAGE_DATA_FETCHED,
});
