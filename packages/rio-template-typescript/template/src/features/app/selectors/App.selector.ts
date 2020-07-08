import get from 'lodash/fp/get';
import { State } from '../../../types';

export const getSessionExpiredAcknowledged = (a: State) => {
    return get('app.sessionExpiredAcknowledged', a);
};
