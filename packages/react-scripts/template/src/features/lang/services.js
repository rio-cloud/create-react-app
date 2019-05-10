import getOr from 'lodash/fp/getOr';

import { configureReporting } from '../../setup/errorReporting';
import { authorizeFetch } from '../../fetch';

import { changeLocale, languageDataFetched } from './actions';
import { getSupportedLocale as defaultGetSupportedLocale } from './selectors';

const { captureException } = configureReporting(window, process.env);

// TODO: change the module ID
const MODULE_NAME = `web-starter-template`;

const sendError = (exception) => {
    captureException(exception, {
        tags: {
            module: MODULE_NAME,
        },
    });
};

// Webpack is weird sometimes, maybe it's Babel, who knows...
const normalizeDynamicImport =
    (imported) => getOr(imported, 'default', imported);

export const configureFetchPreferredLanguage =
    (storage) => (userSettingsBackend, fetch = window.fetch) => {
        const get = authorizeFetch(storage, fetch);
        return get(`${userSettingsBackend}/user/settings/language`)
            .then((response) => {
                // eslint-disable-next-line no-magic-numbers
                if (!response.ok || response.status === 401) {
                    throw new Error(`Fetching user language failed.`);
                }
                return response.json();
            }).catch((error) => {
                sendError(error);
                return error;
            });
    };

export const getLanguageData = (locale) => (
    import(/* webpackChunkName: "[request]" */ `./translations/${locale}.json`)
        .then(normalizeDynamicImport)
        .catch(error => {
            sendError(error);
            return error;
        })
);

export const configureFetchLanguageData =
    (store, fetchLanguageData = getLanguageData, getSupportedLocale = defaultGetSupportedLocale) => (locale) => {
        if (!locale) {
            // eslint-disable-next-line no-console
            console.warn(`No "locale" supplied when fetching language data!`);
            return Promise.reject();
        }

        store.dispatch(changeLocale(locale));
        const supportedLocale = getSupportedLocale(store.getState());
        return fetchLanguageData(supportedLocale).then(languageData => {
            store.dispatch(languageDataFetched(supportedLocale, languageData));
        }).catch(error => {
            // eslint-disable-next-line no-console
            sendError(error);
            return error;
        });
    };

