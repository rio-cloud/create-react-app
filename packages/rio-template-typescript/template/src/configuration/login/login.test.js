/* eslint-disable camelcase */
import merge from 'lodash/fp/merge';

import { configureUserManager, configureMockUserManager } from './login';
import { mapUserProfile } from './userProfile';

jest.useFakeTimers();
jest.mock('../../config', () => ({ config: { login: { mockLocale: 'de-DE' } } }));

describe('features/login/login', () => {
    const profile = {
        account: 'mockaccount',
        azp: 'test-client',
        email: 'test@example.com',
        family_name: 'Client',
        given_name: 'Test',
        locale: 'de-DE',
        name: 'Test Client',
        sub: 'prod-rio-users:mock-user',
    };
    const testSigninPayload = {
        access_token: 'valid-mocked-oauth-bogus-token',
        expires_in: 60 * 60 * 24 * 365,
        profile,
    };

    const testTokenResult = {
        accessToken: 'valid-mocked-oauth-bogus-token',
        expiresInSeconds: 60 * 60 * 24 * 365,
        idToken: profile,
        locale: 'de-DE',
        profile: mapUserProfile(profile),
    };

    describe('configureSetupOAuth', () => {
        const setup = ({ auth } = {}) => {
            const fakeAuth = {
                clearStaleState: jest.fn(),
                events: {
                    addSilentRenewError: jest.fn(),
                    addUserLoaded: jest.fn(),
                    addUserUnloaded: jest.fn(),
                    addUserSignedOut: jest.fn(),
                },
                signinRedirect: jest.fn(),
                signinSilent: jest.fn(),
            };

            const actualAuth = merge(fakeAuth, auth || {});

            return {
                auth: actualAuth,
            };
        };

        it('should notify when signin is successful', async () => {
            const { auth } = setup();
            const config = {
                onSessionExpired: jest.fn(),
                onSessionRenewed: jest.fn(),
            };
            configureUserManager(config, auth);

            await auth.events.addUserLoaded.mock.calls[0][0](testSigninPayload);

            expect(config.onSessionExpired).not.toHaveBeenCalled();
            expect(auth.signinRedirect).not.toHaveBeenCalled();
            expect(config.onSessionRenewed).toHaveBeenCalledWith(testTokenResult);
        });

        it('should notify on session expiration via callbacks', async () => {
            const { auth } = setup();
            const config = {
                onSessionExpired: jest.fn(),
            };
            configureUserManager(config, auth);

            await auth.events.addUserSignedOut.mock.calls[0][0]();

            expect(config.onSessionExpired).toHaveBeenCalledTimes(1);
        });

        it('should notify when signin fails when login_required error', async () => {
            const { auth } = setup({
                auth: {
                    signinSilent: jest.fn().mockRejectedValue(new Error('login_required')),
                },
            });
            const config = {
                onSessionExpired: jest.fn(),
            };
            configureUserManager(config, auth);

            await auth.events.addSilentRenewError.mock.calls[0][0]();

            expect(config.onSessionExpired).toHaveBeenCalled();
        });

        it('should retry when signin fails on other error', async () => {
            const { auth } = setup({
                auth: {
                    signinSilent: jest.fn().mockRejectedValue(new Error('some other error')),
                },
            });
            const config = {
                onSessionExpired: jest.fn(),
            };
            configureUserManager(config, auth);

            await auth.events.addSilentRenewError.mock.calls[0][0]();

            expect(auth.signinSilent).toHaveBeenCalledTimes(1);
            jest.runOnlyPendingTimers();
            expect(auth.signinSilent).toHaveBeenCalledTimes(2);
        });
    });

    describe('mockOAuth', () => {
        it('should behave as if authentication succeeded and returned a valid access_token', async () => {
            const onSessionRenewed = jest.fn();
            const mockUserManager = configureMockUserManager({ onSessionRenewed });

            await mockUserManager.signinSilent();

            expect(onSessionRenewed).toHaveBeenCalled();
            expect(onSessionRenewed.mock.calls[0][0]).toEqual(testTokenResult);
        });
    });
});
