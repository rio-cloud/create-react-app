import getOr from 'lodash/fp/getOr';
import { changeLocale, languageDataFetched } from './actions';
import { getSupportedLocale as defaultGetSupportedLocale } from './selectors';
import { LanguageDataInterface } from './types';
import { Store } from 'redux';
import { State } from '../../types';

const sendError = (exception: string) => {
    console.error(exception);
};

// Webpack is weird sometimes, maybe it's Babel, who knows...
function normalizeDynamicImport(imported: LanguageDataInterface) {
    return getOr(imported, 'default', imported);
}

export function getLanguageData(locale: string): Promise<LanguageDataInterface> {
    return import(/* webpackChunkName: "[request]" */ `./translations/${locale}.json`)
        .then(normalizeDynamicImport)
        .catch(error => {
            sendError(error);
            return error;
        });
}

export const configureFetchLanguageData = (
    store: Store,
    fetchLanguageData: (a: string) => Promise<LanguageDataInterface> = getLanguageData,
    getSupportedLocale: (a: State) => string = defaultGetSupportedLocale
) => (locale: string) => {
    if (!locale) {
        // eslint-disable-next-line no-console
        console.warn('No "locale" supplied when fetching language data!');
        return Promise.reject();
    }

    store.dispatch(changeLocale(locale));
    const supportedLocale = getSupportedLocale(store.getState());
    return fetchLanguageData(supportedLocale)
        .then(languageData => {
            store.dispatch(languageDataFetched(supportedLocale, languageData));
        })
        .catch(error => {
            // eslint-disable-next-line no-console
            sendError(error);
            return error;
        });
};
