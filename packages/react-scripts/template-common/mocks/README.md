# Test mocks

These files are downloads of externals defined in the [config-overrides](../config-overrides.js) file.

They get downloaded in the `pre-test` script of npm.

They serve as alternative module source in the Jest test environment. Please see the Jest configuration in the `package.json of the app.

Note that `react` and `react-dom` are installed as dev dependencies. But the mock file `React.js` is needed because the smart components require a module `React` (with capital R) to be present.

# Dev mocks`

`rio-starter-devmocks.js` serves as the user settings mock server for development purposes.
This is the only file that is not downloaded as external.
