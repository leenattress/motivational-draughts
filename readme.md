# Motivational Draughts

![yeahdraughts](readme-header.png)

> Play draughts and feel great 💖

To feel great right **now**, check out the [demo](https://df6elh427uk9i.cloudfront.net/)!

## Features

* Two players in one browser. SIT WITH A FRIEND!
* ASMR level sound effects.
* Motivation(tm) after every turn.
* `@ionic/core` for the UI.
* Stencil for the application logic and routing
* Push Notifications setup
* Unit Tests
* Pre-rendering
* Lazy-loading and code splitting
* Intelligent Polyfills
* Modern mode: ES6/ESM for new browser, ES5 for older
* Service Worker, App manifest, iOS meta tags
* Theming using CSS variables
* FUN

## Getting Started

To contribute, clone this repo to a new directory:

```bash
git clone https://github.com/leenattress/motivational-draughts.git
```

## Develop

To develop, run:

```bash
cd client
npm install
npm start
```
Then visit: [http://localhost:3333/](http://localhost:3333/)


## Production

To build for production, run:

```bash
npm run build
```

A production build includes:

* Minified code bundles
* Generated Service workers
* App manifest


## Unit Tests

`draughts.spec.ts` [is located here](client/src/libs/draughts/draughts.spec.ts)

To run the unit tests (for the shared lib `draughts.ts` as well) once, run:

```bash
npm run test.spec
```

**Expected output:**
```
PASS  src/libs/draughts/draughts.spec.ts

Test Suites: 1 passed, 1 of 2 total
Tests:       33 passed, 33 total
Snapshots:   0 total
Time:        3.172 s
Ran all test suites.
```

To run the unit tests and watch for file changes during development, run:

```bash
npm run test.watch
```

## Stack Deploy

To run serverless commands that interface with your AWS account, you will need to setup your AWS account credentials on your machine.

### Serverless Install
```bash
npm install -g serverless
```

### Deploy
```bash
sls deploy --infraStackName STACK_NAME --aws-profile AWS_PROFILE
```

Where `STACK_NAME` is a string, like `lee` or `production` and where `AWS_PROFILE` is a profile found in your `~/.aws/credentials` file.

Once deployed, get your CloudFront url by running

```bash
sls info --infraStackName STACK_NAME --aws-profile AWS_PROFILE --verbose
```