import defaultTo from 'lodash/fp/defaultTo';
import flow from 'lodash/fp/flow';
import head from 'lodash/fp/head';
import split from 'lodash/fp/split';

const DEFAULT_LOCALE = 'en-GB';

const supportedLocaleMap = {
    de: 'de-DE',
    'de-DE': 'de-DE',
    en: 'en-GB',
    'en-GB': 'en-GB',
};

const extractLanguage = flow(
    defaultTo(DEFAULT_LOCALE),
    split('-'),
    head
);

const DEFAULT_LANG = extractLanguage(DEFAULT_LOCALE);

export { DEFAULT_LANG, DEFAULT_LOCALE, extractLanguage, supportedLocaleMap };
