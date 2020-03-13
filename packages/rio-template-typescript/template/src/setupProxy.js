// see https://facebook.github.io/create-react-app/docs/proxying-api-requests-in-development
// @ts-ignore
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(createProxyMiddleware('/usersettings', { target: 'http://localhost:3001/' }));
    app.use(createProxyMiddleware('/menu', { target: 'http://localhost:3001/' }));
};
