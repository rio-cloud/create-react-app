module.exports = [
    {
        entry: 'https://cdn.rio.cloud/libs/core-js/3.6.4/core-js.min.js',
        global: 'CoreJs',
        module: 'core-js',
    },
    {
        entry: 'https://cdn.rio.cloud/libs/react/16.13.1/react.min.js',
        global: 'React',
        module: 'react',
    },
    {
        entry: 'https://cdn.rio.cloud/libs/react-dom/16.13.1/react-dom.min.js',
        global: 'ReactDOM',
        module: 'react-dom',
    },
    {
        entry: 'https://cdn.rio.cloud/libs/react-intl/4.5.4/react-intl.min.js',
        global: 'ReactIntl',
        module: 'react-intl',
    },
    {
        entry: 'https://cdn.rio.cloud/libs/oidc-client/1.10.1/oidc-client.min.js',
        global: 'Oidc',
        module: 'oidc-client',
    },
    {
        entry: [
            'https://uikit.developers.rio.cloud/0.14.0/rio-uikit.js',
            'https://uikit.developers.rio.cloud/0.14.0/rio-uikit.css',
        ],
        global: 'RioUikit',
        module: 'rio-uikit',
    },
    {
        entry: 'https://user-menu-component.iam.rio.cloud/1.0.1/rio-user-menu.js',
        global: 'RioUserMenu',
        module: 'rio-user-menu',
    },
    {
        entry: 'https://session-expired-info.developers.rio.cloud/0.9.4/rio-session-expired-info.js',
        global: 'RioSessionExpiredInfo',
        module: 'rio-session-expired-info',
    },
];
