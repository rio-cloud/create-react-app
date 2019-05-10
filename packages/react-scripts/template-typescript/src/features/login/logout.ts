import { Config } from '../../setup/config';

export function redirectToLogout() {
    const { logoutUri } = Config;

    if (typeof logoutUri !== 'undefined') {
        window.location.href = logoutUri;
    }
}
