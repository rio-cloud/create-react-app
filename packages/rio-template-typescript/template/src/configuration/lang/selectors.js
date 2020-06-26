import get from 'lodash/fp/get';

export const getLocale = get('lang.displayLocale');

export const getDisplayMessages = get('lang.displayMessages');
