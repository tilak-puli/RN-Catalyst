# Typescript

- [Typescript](#typescript)
  - [Overview](#overview)

## Overview

In our starter kit we have two types of setup for [Typescript](https://www.typescriptlang.org).

- Root level: It will work for all packages with some default configurations.
- Package Level: For every package we may need to change TS configuration according to that particular package.

We are using [Typescript ESLint Parser](https://www.npmjs.com/package/@typescript-eslint/parser) to lint TypeScript source code.

### Root Level

At root we have a `tsconfig.json` file which have some default TS compiler options.

### Package Level

In packages we are extending `tsconfig.json` from root and overriding compiler options if needed for that particular package.
