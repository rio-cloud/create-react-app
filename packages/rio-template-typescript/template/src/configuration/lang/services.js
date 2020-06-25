import getOr from 'lodash/fp/getOr';

import { reportErrorToSentry } from '../setup/sentry';

import { changeLocale, displayMessagesFetched } from './actions';
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

export const importDisplayMessages = locale =>
    import(/* webpackChunkName: "[request]" */ `../../features/translations/${locale}.json`)
        .then(normalizeDynamicImport)
        .catch(error => {
            sendError(error);
            return error;
        });

export const configureFetchDisplayMessages = (
    store,
    fetchDisplayMessages = importDisplayMessages,
    getSupportedLocale = defaultGetSupportedLocale
) => async locale => {
    if (!locale) {
        console.warn('No "locale" supplied when fetching display messages!');
        return Promise.reject();
    }

    store.dispatch(changeLocale(locale));
    const supportedLocale = getSupportedLocale(store.getState());

    try {
        const displayMessages = await fetchDisplayMessages(supportedLocale);
        trace(`Display messages fetched for "${supportedLocale}"`);
        store.dispatch(displayMessagesFetched(supportedLocale, displayMessages));
    } catch (error) {
        console.error(`Display messages for "${supportedLocale}" could not be fetched.`, error);
        sendError(error);
        return error;
    }
};
