import get from 'lodash/fp/get';
import getOr from 'lodash/fp/getOr';

export const getUserProfile = getOr(null, 'login.userProfile');

export const getUserAccount = getOr(null, 'login.userProfile.account');

export const hasUserSessionEverExpired = get('login.hasUserSessionEverExpired');

export const isUserSessionExpired = get('login.userSessionExpired');
