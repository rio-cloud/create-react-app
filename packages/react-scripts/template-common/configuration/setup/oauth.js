import { config } from '../../config';
import { trace } from './trace';
import { history } from './store';
import { mockOAuth, retrieveInitialState, setupOAuth } from '../login/login';

export const oauthBehavior = settings => {
    const isAllowedToMockAuth = process.env.NODE_ENV !== 'production';
    const promise = isAllowedToMockAuth && config.login.mockAuthorization ? mockOAuth(settings) : setupOAuth(settings);

    return promise.then(() => {
        const { initialRoute } = retrieveInitialState();

        trace('initialRoute lookup', initialRoute);
        if (initialRoute) {
            trace(`history.replace("/${initialRoute}")`);
            history.replace(`/${initialRoute}`);
        }

        return Promise.resolve();
    });
};
