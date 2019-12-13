declare module "rio-accountmenu" {

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

    interface DefaultAccountMenuProps {
        accessToken: string;
        idToken: IDToken;
        userSettingsEndpoint?: string;
    }

    class DefaultAccountMenu extends React.Component<DefaultAccountMenuProps> {
    }

    export {
        DefaultAccountMenu,
        EVENT_USER_LOGGED_OUT,
        EVENT_USER_LANGUAGE_CHANGED,
        EVENT_USER_PROFILE_CHANGED,
    };
}
