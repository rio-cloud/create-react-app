const externals = require('./config-externals');
const https = require('https');
const fs = require('fs');

const skippedModules = ['react-dom'];

externals.scripts.forEach(external => {
    if (!external.hasOwnProperty('external') || !external.external.hasOwnProperty('packageName') || !external.hasOwnProperty('path')) {
        console.log('Cannot download file for ' + JSON.stringify(external));
    }

    if (skippedModules.indexOf(external.external.packageName) >= 0) {
        return;
    }

    let path = `./mocks/${external.external.packageName}.js`;

    if ('react' === external.external.packageName) {
        path = `./mocks/React.js`; //important because smart components require a module called "React"
    }

    const file = fs.createWriteStream(path);
    const source =
      typeof external.path === 'string' ? external.path : external.path.filter(src => src.endsWith('.js'))[0];
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
