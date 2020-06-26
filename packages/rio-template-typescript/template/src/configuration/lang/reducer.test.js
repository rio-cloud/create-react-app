import { changeLocale, displayMessagesFetched } from './actions';
import { DEFAULT_LOCALE } from './lang';

import reducer from './reducer';

describe(`features/lang/reducer`, () => {
    it(`CHANGE_LOCALE should set the locale if known`, () => {
        const germanMessages = { key: 'Message' };
        const allMessages = { 'de-DE': germanMessages };
        const initialState = { displayMessages: null, displayLocale: null, allMessages };
        const expectedState = { displayMessages: germanMessages, displayLocale: 'de-DE', allMessages };

        const resultingState = reducer(initialState, changeLocale('de-DE'));
        expect(resultingState).toEqual(expectedState);
    });

    it(`CHANGE_LOCALE should set the locale if supported`, () => {
        const germanMessages = { key: 'Message' };
        const allMessages = { 'de-DE': germanMessages };
        const initialState = { displayMessages: null, displayLocale: null, allMessages };
        const expectedState = { displayMessages: germanMessages, displayLocale: 'de-DE', allMessages };

        const resultingState = reducer(initialState, changeLocale('de'));
        expect(resultingState).toEqual(expectedState);
    });

    it(`CHANGE_LOCALE should set the locale to the default if unrecognized`, () => {
        const messages = { key: 'Message' };
        const allMessages = { [DEFAULT_LOCALE]: messages };
        const initialState = { displayMessages: null, displayLocale: null, allMessages };
        const expectedState = { displayMessages: messages, displayLocale: DEFAULT_LOCALE, allMessages };

        const resultingState = reducer(initialState, changeLocale('invalid'));
        expect(resultingState).toEqual(expectedState);
    });

    it(`DISPLAY_MESSAGES_FETCHED should set the locale and add the messages`, () => {
        const messages = { key: 'Message' };
        const allMessages = { [DEFAULT_LOCALE]: messages };
        const initialState = { displayMessages: null, displayLocale: null, allMessages };

        const newMessages = { key: 'Nachricht' };
        const expectedState = {
            displayMessages: newMessages,
            displayLocale: 'de-DE',
            allMessages: { ...allMessages, 'de-DE': newMessages },
        };

        const resultingState = reducer(initialState, displayMessagesFetched('de-DE', newMessages));
        expect(resultingState).toEqual(expectedState);
    });
});
