declare module "rio-user-menu" {

    interface IDToken {
        sub: string;
        azp: string;
        account: string;
        given_name: string;
        family_name: string;
        name: string;
        locale: string;
        email: string;
    }

    interface DefaultUserMenuProps {
        idToken: IDToken;
        environment: string;
    }

    class DefaultUserMenu extends React.Component<DefaultUserMenuProps> {
    }

    export {
        DefaultUserMenu,
        EVENT_USER_LANGUAGE_CHANGED,
        EVENT_USER_PROFILE_CHANGED,
    };
}
