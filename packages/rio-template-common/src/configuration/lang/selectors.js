import get from 'lodash/fp/get';
import getOr from 'lodash/fp/getOr';

import { DEFAULT_LOCALE } from './lang';

export const getLocale = getOr(DEFAULT_LOCALE, 'lang.displayLocale');

export const getLanguageData = get('lang.displayMessages');

export const getSupportedLocale = get('lang.supportedLocale');
