import cloneDeep from 'lodash/fp/cloneDeep';
import merge from 'lodash/fp/merge';

export const authorizeFetch = (storage, fetch) => (url, options) =>
    fetch(url, merge(cloneDeep(options), {
        headers: {
            Authorization: `Bearer ${storage.getAccessToken()}`,
        },
    }));
