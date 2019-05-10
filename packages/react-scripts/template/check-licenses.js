/* eslint-env node */
/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, './');
const licenseCheckerBin = path.join(
    rootDir,
    'node_modules',
    'license-checker'
);

if (!fs.existsSync(licenseCheckerBin)) {
    console.error([
        `Can only check licenses when "node_modules" is present, `,
        `please run "npm install"`,
    ].join(''));
    process.exit(1);
}

const licenseChecker = require('license-checker');

const pretty = it => JSON.stringify(it, null, '  ');

const checkLicensesWith = whitelist => startDir => {
    console.log(`Checking licenses in ${startDir}...`);

    licenseChecker.init({
        exclude: whitelist.join(','),
        production: true,
        start: startDir,
    }, function(err, json) {
        if (err) {
            throw err;
        }

        console.log();

        const unapproved = Object.keys(json)
            .map(key => [json[key], key])
            .filter(([license, key]) => {
                if (/^rio-/.test(key)) {
                    console.log([
                        `    [OK]: Detected RIO package ${key} `,
                        `with irrelevant license "${license.licenses}" `,
                        `in ${license.path}.`,
                    ].join(''));
                    return false;
                }
                return true;
            });

        console.log();

        if (unapproved.length > 0) {
            console.error(`Unapproved licenses found: ${pretty(unapproved)}`);
            process.exitCode = 1;
            return;
        }

        console.log(`All found licenses approved.`);
        process.exitCode = 0;
    });
};

const whitelist = [
    'Apache-2.0',
    'BSD-2-Clause',
    'BSD-3-Clause',
    'BSL-1.0',
    'CC-BY-2.5',
    'CC-BY-3.0',
    'CC-BY-4.0',
    'CC0-1.0',
    'Eclipse-Dist-1.0',
    'Fcgi',
    'ICU',
    'ISC',
    'Info-ZIP',
    'MIT',
    'NTP',
    'PHP-3.0',
    'PHP-3.01',
    'PostgreSQL',
    'Public Domain',
    'Unlicense',
    'W3C-19880720',
    'WTFPL',
    'X11',
    'Zlib',
    'libpng',
    'zlib',
];

console.log(`Approved licenses for production artifacts: ${pretty(whitelist)}`);

const check = checkLicensesWith(whitelist);
check(rootDir);

