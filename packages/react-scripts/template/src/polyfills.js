import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'classlist-polyfill';
import 'unorm';

// Ahhh, IE11, why won't you let us be
(function() {

    if (typeof window.CustomEvent === 'function') {
        return false;
    }

    function CustomEvent(event, params = { bubbles: false, cancelable: false, detail: undefined }) {
        const evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
    }

    CustomEvent.prototype = window.Event.prototype;

    window.CustomEvent = CustomEvent;
}());

