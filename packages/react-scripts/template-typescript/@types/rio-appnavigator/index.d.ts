declare module "rio-appnavigator" {

    interface DefaultAppNavigatorProps {
        accessToken: string;
        appsEndpoint?: string;
        locale: string;
    }

    class DefaultAppNavigator extends React.Component<DefaultAppNavigatorProps> {
    }

    export {
        DefaultAppNavigator,
    };
}
