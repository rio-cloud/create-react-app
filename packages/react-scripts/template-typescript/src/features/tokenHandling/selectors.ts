import getOr from 'lodash/fp/getOr';
import { AccessToken, IdToken } from './types';
import { State } from '../../types';

export function getAccessToken(a: State): AccessToken {
    return getOr('NO_ACCESS_TOKEN_AVAILABLE', 'tokenHandling.accessToken', a);
}

export function getIdToken(a: State): IdToken {
    return getOr(null, 'tokenHandling.idToken', a);
}
