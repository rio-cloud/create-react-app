import get from 'lodash/fp/get';
import omit from 'lodash/fp/omit';

import reducer from './reducer';

describe(`features/lang/reducer`, () => {
    it(`should provide a known default state`, () => {
        const state = reducer();
        expect(get('allMessages.en', state)).not.toBeUndefined();
        expect(get('allMessages.en-GB', state)).not.toBeUndefined();
        expect(get('displayMessages', state)).not.toBeUndefined();

        expect(omit(['allMessages', 'displayMessages'], state)).toEqual({
            canFetchSupportedLocale: false,
            displayLocale: 'en-GB',
            preferredLocale: 'en-GB',
            supportedLocale: 'en-GB',
        });
    });
});
