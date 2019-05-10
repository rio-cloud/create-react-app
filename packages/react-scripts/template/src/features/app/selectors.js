import get from 'lodash/fp/get';

export const getSessionExpiredAcknowledged =
    get('app.sessionExpiredAcknowledged');

