/* eslint-disable no-undef */
import * as Sentry from '@sentry/browser';

const SENTRY_DNS = '<sntry-dns-token>';

// version and environment are defined in the webpack.define plugin
const release = VERSION;
const environment = ENVIRONMENT;

// should have been called before using it here
// ideally before even rendering your react app
Sentry.init({
    dsn: SENTRY_DNS,
    environment,
    release,
});

export const reportErrorToSentry = (...args) => {
    Sentry.captureException(...args);
};
