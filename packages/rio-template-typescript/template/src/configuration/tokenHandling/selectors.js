import getOr from 'lodash/fp/getOr';

export const getAccessToken = getOr('NO_ACCESS_TOKEN_AVAILABLE', 'tokenHandling.accessToken');

export const getIdToken = getOr(null, 'tokenHandling.idToken');
