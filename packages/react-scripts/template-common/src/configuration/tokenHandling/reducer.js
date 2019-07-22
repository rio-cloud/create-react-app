/* eslint-disable import/no-default-export */

import { accessToken } from './accessToken';
import { ACCESS_TOKEN_STORED, ID_TOKEN_STORED } from './actions';

const initialState = {
    accessToken: accessToken.getAccessToken(),
    idToken: null,
};

const reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case ACCESS_TOKEN_STORED:
            return {
                ...state,
                accessToken: action.payload,
            };
        case ID_TOKEN_STORED:
            return {
                ...state,
                idToken: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;
