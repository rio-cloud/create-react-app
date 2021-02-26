const webpack = require('webpack');
const externals = require('./config-externals');
const packageJson = require('./package.json');

const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');

module.exports = {
    // The Webpack config to use when compiling your react app for development or production.
    webpack: function(config, env) {
        const webpackMode = env === 'production' ? 'production' : 'development';
        const plugins = config.plugins || [];

        config.plugins = [
            ...plugins,
            new HtmlWebpackTagsPlugin({
                publicPath: false,
                tags: [],
                links: externals.links,
                scripts: externals.scripts
            }),
            new webpack.DefinePlugin({
                SERVICE_VERSION: JSON.stringify(packageJson.version),
                SERVICE_ENVIRONMENT: JSON.stringify(webpackMode),
            }),
        ];
        return config;
    },
};
