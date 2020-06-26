import has from 'lodash/fp/has';

import { CHANGE_LOCALE, LANGUAGE_DATA_FETCHED } from './actions';

import { DEFAULT_LOCALE, extractLanguage, supportedLocaleMap } from './lang';
import messagesEN from '../../features/translations/en-GB.json';

const defaultMessages = {
    en: messagesEN,
    [DEFAULT_LOCALE]: messagesEN,
};

const getMessages = ({ allMessages }, locale) => allMessages[locale];

const applyLocale = (state, preferredLocale) => {
    const { allMessages } = state;

    const displayLocale = has(preferredLocale, allMessages) ? preferredLocale : extractLanguage(preferredLocale);
    const supportedLocale = has(preferredLocale, supportedLocaleMap) ? preferredLocale : DEFAULT_LOCALE;

    const canFetchSupportedLocale = displayLocale !== supportedLocale && supportedLocale !== DEFAULT_LOCALE;

    const displayMessages = getMessages(state, supportedLocale);

    return {
        allMessages,
        canFetchSupportedLocale,
        displayLocale,
        displayMessages,
        preferredLocale,
        supportedLocale,
    };
};

// Initially, set DEFAULT_LOCALE and store respective displayMessages in redux store
const defaultState = applyLocale({ allMessages: defaultMessages }, DEFAULT_LOCALE);

const isDefaultLocaleForLang = locale => supportedLocaleMap[locale] === locale;

const hasLocale = locale => Boolean(supportedLocaleMap[locale]);

const mergeLanguageData = (allMessages, displayMessages, locale) => {
    const baseLang = extractLanguage(locale);
    const messages = {
        [locale]: displayMessages,
    };

    if (isDefaultLocaleForLang(locale) || !hasLocale(baseLang)) {
        messages[baseLang] = displayMessages;
    }

    return {
        ...allMessages,
        ...messages,
    };
};

const langReducer = (state = defaultState, action = {}) => {
    switch (action.type) {
        case CHANGE_LOCALE: {
            return {
                ...state,
                ...applyLocale(state, action.payload),
            };
        }
        case LANGUAGE_DATA_FETCHED: {
            const { locale, displayMessages } = action.payload;

            if (!displayMessages) {
                return {
                    ...state,
                    ...applyLocale(state, locale),
                };
            }

            const merged = {
                ...state,
                allMessages: mergeLanguageData(state.allMessages, displayMessages, locale),
            };

            return {
                ...merged,
                ...applyLocale(merged, locale),
            };
        }
        default:
            return state;
    }
}

export default langReducer;
