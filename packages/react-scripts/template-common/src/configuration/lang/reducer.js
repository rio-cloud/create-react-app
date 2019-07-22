import cloneDeep from 'lodash/fp/cloneDeep';
import flow from 'lodash/fp/flow';
import forEach from 'lodash/fp/forEach';
import has from 'lodash/fp/has';
import keys from 'lodash/fp/keys';

import {
    CHANGE_LOCALE,
    LANGUAGE_DATA_FETCHED,
} from './actions';

import {
    DEFAULT_LOCALE,
    extractLanguage,
    supportedLocaleMap,
} from './lang';
import messagesEN from '../../features/translations/en-GB.json';

const defaultMessages = {
    en: messagesEN,
    [DEFAULT_LOCALE]: messagesEN,
};

const getSupportedLocaleFromData = (data) => flow(
    locale => has(locale, data) ? locale : extractLanguage(locale),
    locale => has(locale, data) ? locale : DEFAULT_LOCALE
);

const getMessages = ({ allMessages }, locale) => (
    allMessages[supportedLocaleMap[locale]] || allMessages[DEFAULT_LOCALE]
);

const isLangOnly = (locale) => !/-/.test(locale);

const defaultFor = (locale) => supportedLocaleMap[locale];

const patchMissingMessages = (knownMessages, messages) => {
    const result = cloneDeep(messages);

    flow(
        keys,
        forEach(key => {
            if (!has(key, result)) {
                result[key] = knownMessages[key];
            }
        })
    )(knownMessages);

    return result;
};

const applyLocale = (state, preferredLocale) => {
    const { allMessages } = state;

    const getDisplayLocale = getSupportedLocaleFromData(allMessages);
    const getSupported = getSupportedLocaleFromData(supportedLocaleMap);

    const displayLocale = getDisplayLocale(preferredLocale);

    const closest = getSupported(preferredLocale);
    const supportedLocale = isLangOnly(closest) ? defaultFor(closest) : closest;

    const canFetchSupportedLocale = displayLocale !== supportedLocale;

    const displayMessages = patchMissingMessages(
        getMessages(state, DEFAULT_LOCALE),
        getMessages(state, displayLocale)
    );

    const result = {
        allMessages,
        canFetchSupportedLocale,
        displayLocale,
        displayMessages,
        preferredLocale,
        supportedLocale,
    };

    return result;
};

const defaultState = applyLocale(
    { allMessages: defaultMessages },
    DEFAULT_LOCALE
);

const isDefaultLocaleForLang = (locale) => (
    supportedLocaleMap[locale] === locale
);

const hasLocale = (locale) => (
    Boolean(supportedLocaleMap[locale])
);

const mergeLanguageData = (allMessages, languageData, locale) => {
    const baseLang = extractLanguage(locale);
    const messages = {
        [locale]: languageData,
    };

    if (isDefaultLocaleForLang(locale) || !hasLocale(baseLang)) {
        messages[baseLang] = languageData;
    }

    return {
        ...allMessages,
        ...messages,
    };
};

export default function langReducer(state = defaultState, action = {}) {
    switch (action.type) {
        case CHANGE_LOCALE: {
            return {
                ...state,
                ...applyLocale(state, action.payload),
            };
        }
        case LANGUAGE_DATA_FETCHED: {
            const { locale, languageData } = action.payload;

            if (!languageData) {
                return {
                    ...state,
                    ...applyLocale(state, locale),
                };
            }

            const merged = {
                ...state,
                allMessages: mergeLanguageData(state.allMessages, languageData, locale),
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
