import cloneDeep from 'lodash/fp/cloneDeep';
import flow from 'lodash/fp/flow';
import forEach from 'lodash/fp/forEach';
import has from 'lodash/fp/has';
import keys from 'lodash/fp/keys';

import {
    CHANGE_LOCALE,
    LANGUAGE_DATA_FETCHED,
    LanguageActionTypes,
    LanguageDataInterface,
    LanguageState,
    MessagesInterface,
} from './types';

import messagesEN from './translations/en-GB.json';
import { DEFAULT_LOCALE, extractLanguage, supportedLocaleMap } from './lang';

const defaultMessages: MessagesInterface = {
    en: messagesEN,
    [DEFAULT_LOCALE]: messagesEN,
};

const getSupportedLocaleFromData = (data: LanguageDataInterface | MessagesInterface) =>
    flow(
        (locale: any) => (has(locale, data) ? locale : extractLanguage(locale)),
        (locale: string) => (has(locale, data) ? locale : DEFAULT_LOCALE)
    );

const getMessages = ({ allMessages }: LanguageState, locale: string) =>
    allMessages[supportedLocaleMap[locale]] || allMessages[DEFAULT_LOCALE];

const isLangOnly = (locale: string) => !/-/.test(locale);

const defaultFor = (locale: string) => supportedLocaleMap[locale];

const patchMissingMessages = (knownMessages: LanguageDataInterface, messages: LanguageDataInterface) => {
    const result = cloneDeep(messages);

    flow(
        keys,
        forEach((key: string) => {
            if (!has(key, result)) {
                result[key] = knownMessages[key];
            }
        })
    )(knownMessages);

    return result;
};

const applyLocale: (s: LanguageState, p: string) => LanguageState = (state, preferredLocale) => {
    const { allMessages } = state;

    const getDisplayLocale = getSupportedLocaleFromData(allMessages);
    const getSupported = getSupportedLocaleFromData(supportedLocaleMap);

    const displayLocale = getDisplayLocale(preferredLocale);

    const closest = getSupported(preferredLocale);
    const supportedLocale = isLangOnly(closest) ? defaultFor(closest) : closest;

    const canFetchSupportedLocale = displayLocale !== supportedLocale;

    const displayMessages = patchMissingMessages(getMessages(state, DEFAULT_LOCALE), getMessages(state, displayLocale));

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

const defaultState: LanguageState = applyLocale({ allMessages: defaultMessages }, DEFAULT_LOCALE);

const isDefaultLocaleForLang = (locale: string) => supportedLocaleMap[locale] === locale;

const hasLocale = (locale: string) => Boolean(supportedLocaleMap[locale]);

const mergeLanguageData = (allMessages: MessagesInterface, languageData: LanguageDataInterface, locale: string) => {
    // TODO it should be string, but the types for lodash flow suggest string | undefiend
    const baseLang: any = extractLanguage(locale);
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

export default function langReducer(state: LanguageState = defaultState, action: LanguageActionTypes): LanguageState {
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
