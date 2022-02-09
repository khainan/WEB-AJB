# Dashboard User App

This app is show list of users get by randomuser.me

## DEMO APP
https://gracious-bohr-82ce4d.netlify.app/

## Table of Contents

1. [Requirements](#requirements)
2. [Getting Started](#getting-started)

## Requirements

- node `16.13.1 (LTS)`
- npm `6.10.4`

## Configuration (Local Machine)

- Clone repo to your local machine

```bash
$ npm install                   # Install project dependencies
```
## Getting Started

you can start the site by running these commands:

```bash
$ npm start                     # Compile and launch
```

While developing, you will probably rely mostly on `npm start`; however, there are additional scripts at your disposal:

| `npm run <script>` | Description                                                                                           |
| ------------------ | ----------------------------------------------------------------------------------------------------- |
| `start`            | Serves your app at `localhost:3000`. HMR will be enabled and `client.css` file will not be generated. |
| `build`            | Compiles the application to disk (`~/build` by default).                                              |
| `serve`            | Serves your builded app at `localhost:3000`. Using `./bin/cluster`, to simulate production behaviour. |
## Branches

There are following branches used in project:

- `main` that is what is running on production server

## Releasing to Production

We use auto deploy tag for our production build from https://app.netlify.com/, you just need to merge any commit to `main` branch
## File and Folder naming convention

- React JS or JSX or Javascript Class shoud be named Pascal case, for example - OrderDetailPanel.js
- Js files should be named in camel case, for example - verifyPhone.js
- folder names should be all in small letters, if it's more than a word, then they should be seperated by -, for example -> core-library,
  But if the folder is behave as React component index container then it should use Pascal case.