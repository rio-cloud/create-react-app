import { HIDE_SESSION_EXPIRED_DIALOG } from './types';

export function hideSessionExpiredDialog() {
    return {
        type: HIDE_SESSION_EXPIRED_DIALOG,
    };
}
