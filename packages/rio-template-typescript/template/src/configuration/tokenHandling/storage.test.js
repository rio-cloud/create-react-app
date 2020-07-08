import { configureStorage } from './storage';

describe('features/tokenHandling/storage', () => {
    const devProcessEnv = {
        NODE_ENV: 'development',
    };

    const prodProcessEnv = {
        NODE_ENV: 'production',
    };

    const makeStore = storage => {
        return {
            getItem: key => storage[key],
            removeItem: key => {
                storage[key] = null;
            },
            setItem: (key, value) => {
                storage[key] = value;
            },
        };
    };

    const makeWin = (env = 'production', storage = null) => ({
        location: {
            host: env === 'production' ? 'home.rio.cloud' : 'somewhere.else.ip',
        },
        localStorage: storage ? makeStore(storage) : null,
    });

    describe(`the behavior in "development" environment`, () => {
        const env = 'development';
        const processEnv = devProcessEnv;

        it('should discard an access token properly', () => {
            const token = 'sooka';
            const internal = {
                access_token: token,
            };
            const storage = configureStorage(makeWin(env, internal), processEnv);

            storage.discardAccessToken();

            expect(storage.getAccessToken()).not.toEqual(token);
        });

        it('should save an access token properly', () => {
            const token = 'sooka';
            const internal = {
                access_token: token,
            };
            const storage = configureStorage(makeWin(env, internal), processEnv);

            storage.saveAccessToken('iro');

            expect(storage.getAccessToken()).toEqual('iro');
        });
    });

    describe(`the behavior in "production" environment`, () => {
        const env = 'production';
        const processEnv = prodProcessEnv;

        it('should not use persistent storage', () => {
            const token = 'sooka';
            const internal = {};
            const storage = configureStorage(makeWin(env, internal), processEnv);

            storage.saveAccessToken(token);

            expect(storage.hasAccessToken()).toEqual(true);
            expect(storage.getAccessToken()).toEqual(token);

            expect(internal['access_token']).not.toEqual(token);
        });

        it('should discard an access token properly', () => {
            const token = 'sooka';
            const storage = configureStorage(makeWin(env), processEnv);

            storage.saveAccessToken(token);
            expect(storage.getAccessToken()).toEqual(token);

            storage.discardAccessToken();
            expect(storage.getAccessToken()).not.toEqual(token);
        });

        it('should save an access token properly', () => {
            const internal = {
                access_token: 'sooka',
            };
            const storage = configureStorage(makeWin(env, internal), processEnv);

            storage.saveAccessToken('iro');

            expect(storage.getAccessToken()).toEqual('iro');
            expect(internal['access_token']).not.toEqual('iro');
        });
    });
});
