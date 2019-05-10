/* eslint-disable import/no-default-export */

import { accessToken } from './accessToken';
import { ACCESS_TOKEN_STORED, AccessTokenActionTypes, AccessTokenState, ID_TOKEN_STORED } from './types';

const initialState = {
    accessToken: accessToken.getAccessToken(),
    idToken: null,
};

export default function reducer(state: AccessTokenState = initialState, action: AccessTokenActionTypes): AccessTokenState {
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
}
