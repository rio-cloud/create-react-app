declare module "rio-user-menu" {

    interface DefaultUserMenuProps {
        environment: string;
        localUserMenu?: boolean;
    }

    class DefaultUserMenu extends React.Component<DefaultUserMenuProps> {
    }

    export {
        DefaultUserMenu,
        EVENT_USER_LANGUAGE_CHANGED,
        EVENT_USER_PROFILE_CHANGED,
    };
}
