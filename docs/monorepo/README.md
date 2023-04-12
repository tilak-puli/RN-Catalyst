# Monorepo

- [Monorepo](#monorepo)
  - [Overview](#overview)
  - [Challenges in RN for hoisting](#challenges-in-rn-for-hoisting)

## Overview

Monorepos, or "monolithic repositories", are single repositories containing multiple apps or packages. It can help speed up development for larger projects, makes it easier to share code, and act as a single source of truth.
But it also adds more complexity, and often requires specific tooling configuration.

Before we continue with Monorepos, we need to understand some mechanisms/configurations in package managers like hoist, no-hoist, workspaces etc. Below are some links of articles or blogs for give you context over these tools or their configurations:

Workspaces- [Workspaces in Yarn](https://classic.yarnpkg.com/blog/2017/08/02/introducing-workspaces/) (Can skip Lerna Part)
Hoist, [no-hoist - nohoist in Workspaces | Yarn Blog](https://classic.yarnpkg.com/blog/2018/02/15/nohoist/)

In this RN starter kit we are using hoisted workspaces

## Challenges in RN for hoisting

1. In React Native, metro is used as a javascript bundler and by default metro is not supporting monorepo architechure, So we need to change some configuration to support monorepo architechure in metro.

```
/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const path = require('path');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');
const monorepoPackages = path.resolve(workspaceRoot, 'packages');
const nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];

const config = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  watchFolders: [__dirname, ...nodeModulesPaths] // <-- We need to tell metro to watch this folders for monorepo
};

module.exports = config;

```

2. As we are using [yarn berry](https://yarnpkg.com) and after yarn v2 they have removed support for `nohoist` glob pattern. so now every dependency will hoist to root which include `react-native` as well. In react native there are some places in native files where relative path of `react-native` node module are hardcoded to something like:

   **Android:**

   ```
   apply from: "../../node_modules/react-native/react.gradle"
   ```

   **iOS:**

   ```
   require_relative '../node_modules/react-native/scripts/react_native_pods'
   ```

   So if we go with hoisted workspaces then this path will become invalid in that case because now `node_modules` are shifted to root

   We can avoid this issue by using Node to find the location of the package instead of hardcoding these relative paths:

   **Android:**

   ```
   apply from: new File(["node", "--print", "require.resolve('react-native/package.json')"].execute(null, rootDir).text.trim(), "../react.gradle")
   ```

   **iOS:**

   ```
   require File.join(File.dirname(`node --print "require.resolve('react-native/package.json')"`), "scripts/react_native_pods")
   ```

3. After doing all of these changes you can try running `yarn workspaces mobile ios` or `yarn workspaces mobile android`, you will see that build will succefully completed but it will give error while metro start building up the project with an error `Error: unable to resolve module ./index`, if you run metro manually with `yarn workspace mobile start` then it will work fine.

   Problem here is with the `packager.sh` script which react native internally using to launch metro form project root which is monorepo root if react native triggering it and `apps/mobile` if we are triggering it with `yarn workspace mobile start`. That's why its showing `Error: unable to resolve module ./index` because index file is present in our `apps/mobile` folder not in monorepo root.

   **Fix:** For fixing this issue we have added a patch for `react-native/scripts/packer.sh` file in which we have just changed the directory from which metro will launch.

   from:

   ```
   PROJECT_ROOT="$THIS_DIR/../../.."
   ```

   to:

   ```
   PROJECT_ROOT="$THIS_DIR/../../../apps/mobile"
   ```
