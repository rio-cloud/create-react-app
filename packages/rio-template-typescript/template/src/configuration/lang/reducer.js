import messagesEN from '../../features/translations/en-GB.json';
import { CHANGE_LOCALE, DISPLAY_MESSAGES_FETCHED } from './actions';
import { DEFAULT_LOCALE, getSupportedLocale } from './lang';

const applyLocale = (state, preferredLocale) => {

    const { allMessages } = state;
    const displayLocale = getSupportedLocale(preferredLocale);
    const displayMessages = allMessages[displayLocale];

    return {
        allMessages,
        displayLocale,
        displayMessages,
    };

};
const mergeLanguageData = (allMessages, languageData, locale) => {
    return {
        ...allMessages,
        [locale]: languageData,
    };
};

const defaultMessages = {
    [DEFAULT_LOCALE]: messagesEN,
};

export const defaultLanguageState = {
    allMessages: defaultMessages,
    displayMessages: null,
    displayLocale: null,
};

const langReducer = (state = defaultLanguageState, action = {}) => {
    switch (action.type) {
        case CHANGE_LOCALE: {
            return {
                ...state,
                ...applyLocale(state, action.payload),
            };
        }
        case DISPLAY_MESSAGES_FETCHED: {
            const { locale, displayMessages } = action.payload;

            return {
                allMessages: mergeLanguageData(state.allMessages, displayMessages, locale),
                displayMessages,
                displayLocale: locale,
            };
        }
        default:
            return state;
    }
}

export default langReducer;
