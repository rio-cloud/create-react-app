import getOr from 'lodash/fp/getOr';

import { reportErrorToSentry } from '../setup/sentry';

import { changeLocale, languageDataFetched } from './actions';
import { getSupportedLocale as defaultGetSupportedLocale } from './selectors';
import { trace } from '../setup/trace';

// TODO: change the module ID
const MODULE_NAME = `web-starter-template`;

const sendError = exception => {
    reportErrorToSentry(exception, {
        tags: {
            module: MODULE_NAME,
        },
    });
};

// Webpack is weird sometimes, maybe it's Babel, who knows...
const normalizeDynamicImport = imported => getOr(imported, 'default', imported);

export const getLanguageData = locale =>
    import(/* webpackChunkName: "[request]" */ `../../features/translations/${locale}.json`)
        .then(normalizeDynamicImport)
        .catch(error => {
            sendError(error);
            return error;
        });

export const configureFetchLanguageData = (
    store,
    fetchLanguageData = getLanguageData,
    getSupportedLocale = defaultGetSupportedLocale
) => locale => {
    if (!locale) {
        // eslint-disable-next-line no-console
        console.warn(`No "locale" supplied when fetching language data!`);
        return Promise.reject();
    }

    store.dispatch(changeLocale(locale));
    const supportedLocale = getSupportedLocale(store.getState());
    return fetchLanguageData(supportedLocale)
        .then(languageData => {
            trace(`Language data fetched for "${supportedLocale}"`);
            store.dispatch(languageDataFetched(supportedLocale, languageData));
        })
        .catch(error => {
            // eslint-disable-next-line no-console
            console.error(`Language data for "${supportedLocale}" could not be fetched.`, error);
            sendError(error);
            return error;
        });
};
