// see https://facebook.github.io/create-react-app/docs/proxying-api-requests-in-development
// @ts-ignore
const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(proxy('/usersettings', { target: 'http://localhost:3001/' }));
};
