'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const express = require("express");
const bodyParser = require("body-parser");

function mockUserSettings(app) {

    const isAuthorized = headers => (
        /Bearer\s+(.+)/.test(headers.authorization)
    );

    const ROLE_FLEET_USER = 'rio.customer.base.FleetUser';
    let preferredLanguage = 'en-GB';

    app.get('/usersettings/whoami', function (req, res) {
        res.json({
            userId: 'a6783b60-4cfe-4876-b1d0-b480846288c5',
            email: 'user-en@my-rio',
            password: null,
            firstName: 'Mocked',
            lastName: 'SharedUsed',
            role: 'USER',
            userRoles: [ROLE_FLEET_USER],
            fleetId: '65f19a9d-99da-4155-962b-7dffa20fd8f5',
            registrationToken: null,
            registrationDate: 1502458710000,
            agbApprovalDate: 1502458710000,
            approvedAgbVersion: '0.1',
            privacyPolicyApprovalDate: 1502458710000,
            approvedPrivacyPolicyVersion: '0.1',
            newsletterApproved: false,
            company: null,
            countryCode: null,
            preferredLanguage: preferredLanguage,
            userGroupIds: [],
        });
    });

    // Adapted from https://collaboration.msi.audi.com/stash/projects/MANZL/repos/platform/browse/frontend/web/backendMock/userSettingsMock.js
    app.get('/usersettings/user/settings/language', function (req, res) {
        if (!isAuthorized(req.headers)) {
            res.send(401);
        } else {
            res.json({
                preferredLanguage,
            });
        }
    });

    app.put('/usersettings/user/settings/language', function (req, res) {
        if (!isAuthorized(req.headers)) {
            res.status(401).end();
        } else if (req.body && req.body.preferredLanguage) {
            preferredLanguage = req.body.preferredLanguage;
            res.status(201).end();
        } else {
            res.status(400).end();
        }
    });

    app.get('/usersettings/user/settings/newsletter', function (req, res) {
        res.json({
            // FIXME
        });
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
app.listen(3001, () => console.log("Express server is running on localhost:3001"));

exports.mockUserSettings = mockUserSettings;
exports.mockAll = mockAll;
