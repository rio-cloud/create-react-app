export const HIDE_SESSION_EXPIRED_DIALOG = 'app/HIDE_SESSION_EXPIRED_DIALOG';

interface HideSessionExpiredAction {
    type: typeof HIDE_SESSION_EXPIRED_DIALOG;
}

export type AppActions = HideSessionExpiredAction;
