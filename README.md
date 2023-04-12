# ReactNative starter kit

![Status](https://github.com/Regional-IT-India/getting-started/blob/main/badges/stable.svg)

ReactNative starter kit incorporating sensible defaults for mobile app project

## Table Of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Upcoming Features](#upcoming-features)
- [Quick start](#quick-start)
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Tips](#tips)
- [Documentation](#documentation)
- [Architecture Decision Record](#adr)

## Introduction

- React native catalyst is an opinionated code structure along with recommended coding practices to spread common pattern and practices followed in the community.
- A decent local dev set up, CI/CD setup and detailed documentation for all the features.
- Ready to use dev and prod environments setup.

## Features

1. Monorepo
2. Yarn v3
3. Hoisted worksapces
4. Typescript Support
5. Tools
   1. Es-Lint
   2. Prettier
   3. Jest
   4. Editor config
   5. Commitizen
   6. Husky
   7. Talisman
6. Testing
7. Storage layer
8. Network layer (supports HTTP request aborts)
9. Routing
10. Localisation
11. Styled component
12. Context API
13. Environment based setup
14. CI/CD for android and ios

## Upcoming features

1. User Experience
2. SSL Pinning
3. Crashlytics
4. E2E Testing
5. Universal links support
6. Feature Toggle
7. Release checklist
8. React Theming
9. Creation of guidelines for sharing some apple/google experience.

## Quick Start

### Prerequisites

- Node JS >= 16.10
- Xcode - 13.4, iOS 15
- Cocoapods
- JDK >= 11
- Android Studio and Android SDK(21-31)

Refer [React Native environment setup](https://reactnative.dev/docs/environment-setup) to setup all prerequisites (select `React Native CLI Quickstart` tab and follow instructions according to your OS)

If in case you face any issues please refer [troubleshooting.md](./TROUBLESHOOTING.md)

### Setup

1. Clone this repo using `git@github.com:Regional-IT-India/catalyst-ui-reactnative-starter.git`
2. Move to the appropriate directory: `cd catalyst-ui-reactnative-starter`

- Run `yarn install` to install all the dependencies required to bootstrap the project.
- Run `yarn workspace mock-server start` to start mounte bank server.
- Run `yarn workspace mobile android` to build and run app on android simulator.
- Run `yarn workspace mobile ios` to build and run app on ios simulator.

3. Credentials for login:

- Username - mountebankuser
- Password - mounte@123

> **Note for IOS** : Need to install pods for ios as we are using cocaopods. `cd apps/mobile/ios`, then run `pod install`

> **Note for mounte bank server** : We need to change IP Address in .env.development file for mounte bank connectivity. Just check you IP address with `ipconfig getifaddr en0` and use that address to replace in `.env.development` file, that's it.

### Tips

- Add `Prettier` extension and set it as default formatter and enable `Run on save` option
- Also install `ESLint` extension for code analysis.
- Add `Jest Runner` extension for ease of running test cases

## Documentation

- [Folder Structure](docs/folder-structure/README.md)
- [Monorepo](docs/monorepo/README.md)
- [Testing](docs/testing/README.md)
- [CI/CD]()
  - [Continous Integration](docs/cicd/CI.md)
  - [CD for IOS](docs/cicd/CD-IOS.md)
  - [CD for android](docs/cicd/CD-ANDROID.md)
- [Config management](docs/config/README.md)
- [Styling](docs/styling/README.md)
- [Tools](docs/tools/README.md)
- [Spinner](docs/spinner/README.md)
- [Typescript](docs/typescript/README.md)
- [Storage](docs/storage/README.md)

## ADR

Please refer [decisions](docs/decisions/) folder to learn more about our tech choices and more detailed comparisions.
