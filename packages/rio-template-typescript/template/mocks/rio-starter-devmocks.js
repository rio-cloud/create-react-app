'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const express = require('express');
const bodyParser = require('body-parser');

function mockUserSettings(app) {
    app.use(express.static(__dirname + '/static'));

    app.get('/menu', function(req, res) {
        res.send(
            '<!DOCTYPE html>\n' +
                '<html lang="en">\n' +
                '<head>\n' +
                '    <meta charset="UTF-8">\n' +
                '    <title>Mocked Menu</title>\n' +
                '</head>\n' +
                '<body style="background-position: left top; background-image: url(menu.png); background-repeat: no-repeat;">\n' +
                '</body>\n' +
                '</html>'
        );
    });
}
// Convenience export to use all available mocks
function mockAll(app) {
    mockUserSettings(app);
}
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
mockAll(app);
app.listen(3001, () => console.log('Express server is running on localhost:3001'));

exports.mockUserSettings = mockUserSettings;
exports.mockAll = mockAll;
