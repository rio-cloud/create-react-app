# react-scripts

This package includes scripts and configuration used by [Create React App](https://github.com/facebook/create-react-app).<br>
Please refer to its documentation:

- [Getting Started](https://facebook.github.io/create-react-app/docs/getting-started) – How to create a new app.
- [User Guide](https://facebook.github.io/create-react-app/) – How to develop apps bootstrapped with Create React App.


## Purpose

This package enables a quick setup for internal single page applications for [the RIO platform](https://rio.cloud)


## What you get

 * Authentication
 * Translations
 * Error logs via [Sentry](https://sentry.io)
 * Basic application layout with [the RIO UIKit](https://uikit.developers.rio.cloud) 

 
## Usage

Create your app like this: 
```
npx create-react-app rio-test-app --scripts-version @rio-cloud/react-scripts --use-npm --typescript
```
Omit `--typescript` if you want to get the Javascript version.
