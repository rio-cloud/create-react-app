declare module "rio-session-expired-info" {

    interface SessionExpiredDialogProperties {
        locale: string,
        onClose: () => void;
        show: boolean;
        onConfirm?: () => void;
    }

    class SessionExpiredDialog extends React.Component<SessionExpiredDialogProperties, {}> {
    }

    export {
        SessionExpiredDialog,
    };
}
