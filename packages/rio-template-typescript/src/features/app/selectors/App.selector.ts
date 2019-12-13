import get from 'lodash/fp/get';
import { State } from '../../../types';

export function getSessionExpiredAcknowledged(a: State) {
    return get('app.sessionExpiredAcknowledged', a);
}
