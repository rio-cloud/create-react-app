import { DEFAULT_LANG, DEFAULT_LOCALE, extractLanguage, supportedLocaleMap } from './lang';

describe(`features/lang/lang`, () => {
    it(`should export the suitable default language`, () => {
        expect(DEFAULT_LANG).toEqual('en');
    });

    it(`should export the suitable default locale`, () => {
        expect(DEFAULT_LOCALE).toEqual('en-GB');
    });

    it(`should provide a map of the supported locales`, () => {
        expect(supportedLocaleMap).toEqual({
            de: 'de-DE',
            'de-DE': 'de-DE',
            en: 'en-GB',
            'en-GB': 'en-GB',
        });
    });

    describe(`the "extractLanguage" helper`, () => {
        /* eslint-disable no-undefined */

        it(`should return the language part of a locale`, () => {
            expect(extractLanguage('fr-FR')).toEqual('fr');
        });

        it(`should return the default language`, () => {
            expect(extractLanguage(null)).toEqual('en');
            expect(extractLanguage(undefined)).toEqual('en');
        });

        it(`should be ok when the structure does not match what is expected`, () => {
            expect(extractLanguage('cs')).toEqual('cs');
        });
    });
});
