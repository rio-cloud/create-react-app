/* eslint-disable no-undef */
import * as Sentry from '@sentry/browser';
import { config } from '../../config';

if (config.sentryToken) {
    // version and environment are defined in the webpack.define plugin
    const release = SERVICE_VERSION;
    const environment = SERVICE_ENVIRONMENT;

    // should have been called before using it here
    // ideally before even rendering your react app
    Sentry.init({
        dsn: config.sentryToken,
        environment,
        release,
    });
}

export const reportErrorToSentry = (...args) => {
    Sentry.captureException(...args);
};
