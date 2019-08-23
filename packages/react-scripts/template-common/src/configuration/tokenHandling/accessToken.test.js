import { configureAccessToken, extractAccessTokenFromWindowLocation } from './accessToken';

describe('features/tokenHandling/accessToken', () => {
    describe('the access token extraction from the window.location', () => {
        const extract = extractAccessTokenFromWindowLocation;

        const hashWin = token => ({
            location: {
                href: `https://airmonads.rio.cloud/#access_token=${token}`,
            },
        });

        const queryWin = token => ({
            location: {
                href: `https://airmonads.rio.cloud/redirectlogin?access_token=${token}`,
            },
        });

        it('should be OK when no window is present', () => {
            const defaultValue = undefined;

            expect(extract()).toEqual(defaultValue);
            expect(extract({})).toEqual(defaultValue);
            expect(extract({ location: null })).toEqual(defaultValue);
            expect(extract({ location: {} })).toEqual(defaultValue);
            expect(extract({ location: { href: null } })).toEqual(defaultValue);
            expect(extract({ location: { href: null } })).toEqual(defaultValue);
            expect(extract({ location: { href: {} } })).toEqual(defaultValue);
        });

        it('should find the token from a redirect url from hash', () => {
            const win = hashWin('aang');
            expect(extract(win)).toEqual('aang');
        });

        it('should find the token from a redirect url from query', () => {
            const win = queryWin('aang');
            expect(extract(win)).toEqual('aang');
        });
    });

    const makeWin = token => ({
        location: {
            host: `water.rio.cloud`,
            href: `https://water.rio.cloud/#access_token=${token}`,
        },
    });

    describe('configureAccessToken', () => {
        const fakeStorage = initialToken => {
            let accessToken = initialToken;
            return {
                getAccessToken: () => accessToken,
                saveAccessToken: token => (accessToken = token),
            };
        };

        it('should extract and store the token from the url', () => {
            const win = makeWin('katara');
            const storage = fakeStorage();
            const api = configureAccessToken(win, storage);

            expect(api.getAccessToken()).toEqual('katara');
        });

        it('should be able to cope with a non-existent window gracefully', () => {
            const storage = fakeStorage('untouched-token');
            const api = configureAccessToken(undefined, storage);

            expect(api.getAccessToken()).toEqual('untouched-token');
        });
    });
});
