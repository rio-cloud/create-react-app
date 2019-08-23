import reducer from './reducer';

describe(`features/login/reducer`, () => {
    const initialState = {
        hasUserSessionEverExpired: false,
        userProfile: null,
        userSessionExpired: false,
    };

    it(`should bring a sensible initial state to the table`, () => {
        expect(reducer()).toEqual(initialState);
        expect(reducer(initialState) === initialState).toBe(true);
    });

    it(`should reflect an expired user session`, () => {
        const fact = {
            type: 'login/USER_SESSION_EXPIRED',
        };

        const newState = reducer(initialState, fact);
        expect(initialState === newState).toBe(false);
        expect(newState).toEqual({
            ...initialState,
            hasUserSessionEverExpired: true,
            userSessionExpired: true,
        });
    });

    it(`should reflect a renewed user session`, () => {
        const fact = {
            type: 'login/USER_SESSION_EXPIRED',
        };

        const newState = reducer(reducer(initialState, fact), {
            type: 'login/USER_SESSION_RENEWED',
        });
        expect(initialState === newState).toBe(false);
        expect(newState).toEqual({
            ...initialState,
            hasUserSessionEverExpired: true,
            userSessionExpired: false,
        });
    });
});
