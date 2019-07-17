/* eslint-disable no-undef */
import * as Sentry from '@sentry/browser';
import { env } from '../env';

// version and environment are defined in the webpack.define plugin
const release = VERSION;
const environment = ENVIRONMENT;

// should have been called before using it here
// ideally before even rendering your react app
Sentry.init({
    dsn: env.runtimeConfig.sentryToken,
    environment,
    release,
});

export const reportErrorToSentry = (...args) => {
    if (env.shouldSendMetrics) {
        Sentry.captureException(...args);
    }
};
