module.exports = [
    {
        entry: 'https://cdn.rio.cloud/libs/react/16.10.2/react.min.js',
        global: 'React',
        module: 'react',
    },
    {
        entry: 'https://cdn.rio.cloud/libs/react-dom/16.10.2/react-dom.min.js',
        global: 'ReactDOM',
        module: 'react-dom',
    },
    {
        entry: [
            'https://uikit.developers.rio.cloud/0.13.7/rio-uikit.js',
            'https://uikit.developers.rio.cloud/0.13.7/rio-uikit.css',
        ],
        global: 'RioUikit',
        module: 'rio-uikit',
    },
    {
        entry: 'https://user-menu-component.iam.rio.cloud/0.2.0/rio-user-menu.js',
        global: 'RioUserMenu',
        module: 'rio-user-menu',
    },
    {
        entry: 'https://session-expired-info.developers.rio.cloud/0.9.4/rio-session-expired-info.js',
        global: 'RioSessionExpiredInfo',
        module: 'rio-session-expired-info',
    },
];
