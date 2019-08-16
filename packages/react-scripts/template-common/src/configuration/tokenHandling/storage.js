export const configureStorage = () => {
    let accessToken = null;
    return {
        discardAccessToken: () => {
            accessToken = null;
        },
        getAccessToken: () => accessToken,
        hasAccessToken: () => Boolean(accessToken),
        saveAccessToken: token => {
            accessToken = token;
        },
    };
};
