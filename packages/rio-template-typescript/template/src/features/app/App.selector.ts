import get from 'lodash/fp/get';
import {State} from "../../reducers";

export const getSessionExpiredAcknowledged = (a: State) => {
    return get('app.sessionExpiredAcknowledged', a);
};
