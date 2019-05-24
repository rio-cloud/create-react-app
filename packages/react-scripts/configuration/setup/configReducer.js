import cloneDeep from 'lodash/fp/cloneDeep';
import { Config } from '../../template/src/config';

const initial = cloneDeep(Config);

const configReducer = (state = initial, action = {}) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default configReducer;
