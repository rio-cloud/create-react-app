import * as _ from 'lodash';
import { Config } from './config';
import { ConfigState } from './types';

const initial = _.cloneDeep(Config);

interface GenericActionInterface {
    type?: string;
    payload?: any;
}

export default function(state: ConfigState = initial, action: GenericActionInterface = {}): ConfigState {
    switch (action.type) {
        default:
            return state;
    }
}
