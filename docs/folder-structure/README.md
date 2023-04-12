# Folder Structure

- [Folder Structure](#folder-structure)
  - [Overview](#overview)
  - [Folder specific details](#folder-specific-details)

## Overview

We are using monorepos, or "monolithic repositories", which are single repositories containing multiple apps or packages. It can help speed up development for larger projects, makes it easier to share code, and act as a single source of truth. Read more about [mono repos](https://monorepo.tools/)

```
├──apps/
|    ├── mobile/
|    |    └── src/
|    |        ├── api/
|    |        ├── assets/
|    |        ├── components/
|    |        ├── config/
|    |        ├── context/
|    |        ├── hooks/
|    |        ├── i18n/
|    |        |   └── languages/
|    |        ├── navigation/
|    |        ├── network/
|    |        ├── reducers/
|    |        ├── screens/
|    |        |   ├── home/
|    |        |   ├── dashboard/
|    |        |   ├── user/
|    |        |   └── auth/
|    |        |       ├── login.tsx
|    |        |       ├── logout.tsx
|    |        |       └── register.tsx
|    |        ├── storage/
|    |        ├── utilities/
|    |        └── fonts/
|    |
|    └── mock-server/
|           └── src/
|               └── services/
|                   └── user-service.js
|
|
└──packages/ (Release 2)
    └── core/
    └── shared-configs/

```

## Folder specific details

- apps/mobile/src/api/
  - This folder will contain your all HTTP requests logics/methods based on module like auth, user, product etc
- apps/mobile/src/assets/
  - This is where we store all the assets related to the app, generally this contains images, SVGs and other static items
- apps/mobile/src/components/
  - This folder contains all the individual components within the app, doesn't matter if they are only used once or not. This allows us to break apart our app's presentation view into reusable chunks that can be imported anywhere with in the app.
  - This folder can further be integrated with storybook and component specific documentation and tests can be added to improve code quality
- apps/mobile/src/config/
  - Place where we are importing all env variables and exporting it from this config. In this way we have more control over our env configs variables
- apps/mobile/src/context/
  - This folder contain all context API logics which we are using in our app
- apps/mobile/src/hooks/
  - We can store our custom hooks in this folder
- apps/mobile/src/i18n/
  - This folder contain our localisation feature, language resources and exporting method for changing language
- apps/mobile/src/navigation/
  - This folder contains app navigation stacks or other implementations to help navigation through app
- apps/mobile/src/network/
  - This folder exports axios instance for making HTTP requests and used by `api/`
- apps/mobile/src/reducers/
  - Here we can store our reducers
- apps/mobile/src/screens/
  - This folder contains UI pages or app screens like Home, Login, signUp etc. and these screens are using individual components to create views for app users
- apps/mobile/src/storage/
  - This folder contains storage implementation
- apps/mobile/src/utilities/
  - For our app utils like test-utils etc
- apps/mock-server/
  - Contains implementaion of mounte bank server for testing thord party services
