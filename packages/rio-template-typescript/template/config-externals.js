module.exports = {
    links: [
        {
            path: 'https://uikit.developers.rio.cloud/0.14.0/rio-uikit.css',
            attributes: {
                rel: 'stylesheet',
            },
        },
    ],
    scripts: [
        {
            path: 'https://cdn.rio.cloud/libs/core-js/3.6.4/core-js.min.js',
            external: {
                packageName: 'core-js',
                variableName: 'CoreJs',
            },
            attributes: {
                type: 'text/javascript',
            },
        },
        {
            path: 'https://cdn.rio.cloud/libs/react/17.0.1/react.min.js',
            external: {
                packageName: 'react',
                variableName: 'React',
            },
            attributes: {
                type: 'text/javascript',
            },
        },
        {
            path: 'https://cdn.rio.cloud/libs/react-dom/17.0.1/react-dom.min.js',
            external: {
                packageName: 'react-dom',
                variableName: 'ReactDOM',
            },
            attributes: {
                type: 'text/javascript',
            },
        },
        {
            path: 'https://cdn.rio.cloud/libs/oidc-client/1.10.1/oidc-client.min.js',
            external: {
                packageName: 'oidc-client',
                variableName: 'Oidc',
            },
            attributes: {
                type: 'text/javascript',
            },
        },
        {
            path: 'https://uikit.developers.rio.cloud/0.14.0/rio-uikit.js',
            external: {
                packageName: 'rio-uikit',
                variableName: 'RioUikit',
            },
            attributes: {
                type: 'text/javascript',
            },
        },
        {
            path: 'https://user-menu-component.iam.rio.cloud/1.0.1/rio-user-menu.js',
            external: {
                packageName: 'rio-user-menu',
                variableName: 'RioUserMenu',
            },
            attributes: {
                type: 'text/javascript',
            },
        },
        {
            path: 'https://session-expired-info.developers.rio.cloud/0.9.4/rio-session-expired-info.js',
            external: {
                packageName: 'rio-session-expired-info',
                variableName: 'RioSessionExpiredInfo',
            },
            attributes: {
                type: 'text/javascript',
            },
        },
    ],
};
