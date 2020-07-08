import { getAccessToken } from './selectors';

describe('features/tokenHandling/selectors', () => {
    describe('the "getAccessToken" selector', () => {
        it('should return the default value if the prop is not there at all', () => {
            const store = {
                tokenHandling: {},
            };
            expect(getAccessToken(store)).toEqual('NO_ACCESS_TOKEN_AVAILABLE');
        });

        it('should return "null" if the prop is "null"', () => {
            const store = {
                tokenHandling: {
                    accessToken: null,
                },
            };
            expect(getAccessToken(store)).toEqual(null);
        });

        it('should return the actual value if the prop is there', () => {
            const store = {
                tokenHandling: {
                    accessToken: 'token',
                },
            };
            expect(getAccessToken(store)).toEqual('token');
        });
    });
});
