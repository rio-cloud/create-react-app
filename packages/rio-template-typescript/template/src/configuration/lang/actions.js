export const CHANGE_LOCALE = 'lang/CHANGE_LOCALE';

export const changeLocale = locale => ({
    payload: locale,
    type: CHANGE_LOCALE,
});

export const FETCH_DISPLAY_MESSAGES = 'lang/FETCH_DISPLAY_MESSAGES';

export const fetchDisplayMessages = locale => ({
    payload: locale,
    type: FETCH_DISPLAY_MESSAGES,
});

export const DISPLAY_MESSAGES_FETCHED = 'lang/DISPLAY_MESSAGES_FETCHED';

export const displayMessagesFetched = (locale, displayMessages) => ({
    payload: {
        locale,
        displayMessages,
    },
    type: DISPLAY_MESSAGES_FETCHED,
});