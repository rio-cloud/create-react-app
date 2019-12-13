export const ACCESS_TOKEN_STORED = 'tokenHandling/ACCESS_TOKEN_STORED';
export const ID_TOKEN_STORED = 'tokenHandling/ID_TOKEN_STORED';

export const accessTokenStored = token => ({
    payload: token,
    type: ACCESS_TOKEN_STORED,
});

export const idTokenStored = token => ({
    payload: token,
    type: ID_TOKEN_STORED,
});
