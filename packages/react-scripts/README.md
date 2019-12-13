# react-scripts

This package includes scripts and configuration used by [Create React App](https://github.com/facebook/create-react-app).<br>
Please refer to its documentation:

-   [Getting Started](https://facebook.github.io/create-react-app/docs/getting-started) – How to create a new app.
-   [User Guide](https://facebook.github.io/create-react-app/) – How to develop apps bootstrapped with Create React App.

## Purpose

This package enables a quick setup for internal single page applications for [the RIO platform](https://rio.cloud)

## What you get

-   Authentication
-   Translations
-   Error logs via [Sentry](https://sentry.io)
-   Basic application layout with [the RIO UIKit](https://uikit.developers.rio.cloud)

## Usage

### Create new project

Choose your desired template and create the project as described in the corresponding Readme:

-   [Typescript](https://github.com/rio-cloud/create-react-app/tree/rio-react-scripts/packages/rio-template-typescript) (recommended)
-   [Javascript](https://github.com/rio-cloud/create-react-app/tree/rio-react-scripts/packages/rio-template)

### Update existing project

Just run (replace the version):

```
npm install --save --save-exact @rio-cloud/react-scripts@3.3.0-alpha.1
```

or

```
yarn add --exact @rio-cloud/react-scripts@3.3.0-alpha.1
```
