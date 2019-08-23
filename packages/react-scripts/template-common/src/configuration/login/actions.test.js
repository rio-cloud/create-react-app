import { userSessionExpired, userSessionRenewed } from './actions';

describe(`features/login/actions`, () => {
    describe(`the "userSessionExpired" action creator`, () => {
        it(`should have the appropriate shape`, () => {
            expect(userSessionExpired()).toEqual({
                type: 'login/USER_SESSION_EXPIRED',
            });
        });
    });

    describe(`the "userSessionRenewed" action creator`, () => {
        it(`should have the appropriate shape`, () => {
            expect(userSessionRenewed()).toEqual({
                type: 'login/USER_SESSION_RENEWED',
            });
        });
    });
});
