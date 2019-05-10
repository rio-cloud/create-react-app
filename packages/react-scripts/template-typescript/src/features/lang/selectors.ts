import get from 'lodash/fp/get';
import getOr from 'lodash/fp/getOr';

import { DEFAULT_LOCALE } from './lang';
import { LanguageDataInterface } from './types';
import { State } from '../../types';

export function getLocale(a: State): string {
    return getOr(DEFAULT_LOCALE, 'lang.displayLocale', a);
}

export function getLanguageData(a: State): LanguageDataInterface {
    return get('lang.displayMessages', a);
}

export function getSupportedLocale(a: State): string {
    return get('lang.supportedLocale', a);
}
