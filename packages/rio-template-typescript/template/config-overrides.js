const webpack = require('webpack');
const externals = require('./config-externals');
const packageJson = require('./package.json');

const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');

module.exports = {
    // The Webpack config to use when compiling your react app for development or production.
    webpack: function(config, env) {
        const webpackMode = env === 'production' ? 'production' : 'development';
        const plugins = config.plugins || [];

        config.plugins = [
            ...plugins,
            new HtmlWebpackExternalsPlugin({
                externals: webpackMode === 'production' ? externals : externals.map(external => ({...external, entry: external.entryDev || external.entry})),
                //enabled: env === 'production',
                enabled: true,
            }),
            new webpack.DefinePlugin({
                SERVICE_VERSION: JSON.stringify(packageJson.version),
                SERVICE_ENVIRONMENT: JSON.stringify(webpackMode),
            }),
        ];
        return config;
    },
};
