const externals = require('./config-externals');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');

module.exports = {
    // The Webpack config to use when compiling your react app for development or production.
    webpack: function(config, env) {
        if (!config.plugins) {
            config.plugins = [];
        }
        config.plugins.push(
            new HtmlWebpackExternalsPlugin({
                externals,
                //enabled: env === 'production',
                enabled: true,
            }),
        );
        return config;
    },
    // The Jest config to use when running your jest tests - note that the normal rewires do not
    // work here.
    jest: function(config) {
        if (!config.moduleNameMapper) {
            config.moduleNameMapper = {};
        }

        // workaround to make smart components in __mocks__ folder work
        config.moduleNameMapper["ReactDOM"] = "react-dom";

        return config;
    }
};
