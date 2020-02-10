import { HIDE_SESSION_EXPIRED_DIALOG } from './types';

export const hideSessionExpiredDialog = () => {
    return {
        type: HIDE_SESSION_EXPIRED_DIALOG,
    };
}
