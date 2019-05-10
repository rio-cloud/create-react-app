import get from 'lodash/fp/get';
import getOr from 'lodash/fp/getOr';
import { State } from '../../types';

export function getUserProfile(a: State) {
    return getOr(null, 'login.userProfile', a);
}

export function hasUserSessionEverExpired(a: State) {
    return get('login.hasUserSessionEverExpired', a);
}

export function isUserSessionExpired(a: State) {
    return get('login.userSessionExpired', a);
}
