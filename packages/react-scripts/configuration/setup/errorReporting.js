import cond from 'lodash/fp/cond';
import constant from 'lodash/fp/constant';
import matches from 'lodash/fp/matches';
import noop from 'lodash/fp/noop';
import otherwise from 'lodash/fp/stubTrue';

// eslint-disable-next-line no-use-before-define
export function configureReporting(window = window, processEnv) {
    const { Raven } = window;
    const isRunningOnProd = processEnv.NODE_ENV === 'production';

    // "Real" old IE - as in: not Edge in IE11 mode - is quite iffy about
    // accessing the console when the developer tools are not visible
    // so we will be extra defensive here, just to be safe
    const console = typeof window['console'] !== 'undefined' ?
        window.console :
        null;

    // IE... I'm looking at you <o.O>
    const hasConsole = !!console;

    const justLogException = hasConsole ?
        e => {
            console.error('Exception captured:', e);

            const query = encodeURIComponent(e.message);
            console.info(
                'Let me StackOverflow that for you:',
                `https://stackoverflow.com/search?q=${query}`
            );
            console.info(
                'Let me Google that for you:',
                `https://google.com/search?q=${query}`
            );
        } : noop;

    const reportWithSentry = Raven ?
        (...args) => Raven.captureException(...args) :
        noop;

    const state = {
        isRunningOnProd,
    };

    const captureException = cond([
        [matches({ isRunningOnProd: true }), constant(reportWithSentry)],
        [otherwise, constant(justLogException)],
    ])(state);

    const captureSagaCancelledMiddleware = (/* store */) => (next) => cond([
        [matches({ type: 'report/SAGA_CANCELLED' }), ({ payload }) => captureException(payload)],
        [otherwise, next],
    ]);

    return {
        captureException,
        captureSagaCancelledMiddleware,
    };
}
