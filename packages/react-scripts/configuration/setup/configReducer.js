import cloneDeep from 'lodash/fp/cloneDeep';
import { config } from '../../template/src/config';

const initial = cloneDeep(config);

const configReducer = (state = initial, action = {}) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default configReducer;
