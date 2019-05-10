
export const configureStorage = () => {
    // eslint-disable-next-line immutable/no-let
    let accessToken = null;
    return {
        discardAccessToken: () => {
            accessToken = null;
        },
        getAccessToken: () => accessToken,
        hasAccessToken: () => Boolean(accessToken),
        saveAccessToken: (token) => {
            accessToken = token;
        },
    };

};
