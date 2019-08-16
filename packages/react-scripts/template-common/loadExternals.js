const externals = require('./config-externals');
const https = require('https');
const fs = require('fs');

const skippedModules = ['react-dom'];

externals.forEach(external => {
    if (!external.hasOwnProperty('module') || !external.hasOwnProperty('entry')) {
        console.log('Cannot download file for ' + JSON.stringify(external));
    }

    if (skippedModules.indexOf(external.module) >= 0) {
        return;
    }

    let path = `./mocks/${external.module}.js`;

    if ('react' === external.module) {
        path = `./mocks/React.js`; //important because smart components require a module called "React"
    }

    const file = fs.createWriteStream(path);
    const source =
        typeof external.entry === 'string' ? external.entry : external.entry.filter(src => src.endsWith('.js'))[0];
    const request = https
        .get(source, function(response) {
            response.pipe(file);
            file.on('finish', function() {
                file.close(); // close() is async
            });
        })
        .on('error', function(err) {
            // Handle errors
            fs.unlink(path); // Delete the file async. (But we don't check the result)
            console.log(err.message);
        });
});
