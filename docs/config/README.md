# Config

- [Config](#config)
  - [Environment variables](#environment-variables)
  - [Assets](#assets)

## Environment Variables

We are using [react-native-config](https://github.com/luggit/react-native-config) for managing multiple environments for development, staging and production for both android and ios.

For single environment we dont need any specific setup after installing `react-native-config`, only creation of a `.env` file at the root level will work but for supporting multiple environments we need to do some changes in native layer as well for both android and ios

### Native changes for Android

We need to define envConfigFiles in `build.gradle` associating builds with env files. To achieve this, add the below code and be sure to leave the build cases in lowercase.
`android/app/build.gradle`

```
project.ext.envConfigFiles = [
    production: ".env.production",
    development: ".env.development",
]

apply from: project(':react-native-config').projectDir.getPath() + "/dotenv.gradle"
```

Adding Product Flavor on project below line `compileSdkVersion`

```
android {
    ndkVersion rootProject.ext.ndkVersion

    compileSdkVersion rootProject.ext.compileSdkVersion

    // add this block
    flavorDimensions "default"
    productFlavors {
        production {
            resValue "string", "app_name", "catalystuireactnativestarter"
        }
        development {
            applicationIdSuffix ".dev"
            resValue "string", "app_name", "catalystuireactnativestarter Dev"
        }
    }
    // ---
...
```

> **Note**: `productFlavors` name should match the `envConfigFiles` because each envConfig property is mapped to a particulat productFlavor

Add `build_config_package` resource value in `defaultConfig` or in each productFlavors. Below snippet show addition in defaultConfig:

```
defaultConfig {
  ...
  resValue "string", "build_config_package", "com.catalystuireactnativestarter" // <-- Add this line
  ...
}
```

OR

```
productFlavors {
    production {
        resValue "string", "app_name", "catalystuireactnativestarter"
        resValue "string", "build_config_package", "com.catalystuireactnativestarter" // <-- Add this line
    }
    development {
        applicationIdSuffix ".dev"
        resValue "string", "app_name", "catalystuireactnativestarter Dev"
        resValue "string", "build_config_package", "com.catalystuireactnativestarter" // <-- Add this line
    }
}
```

Create scripts on `package.json`

```
"android": "react-native run-android --variant=developmentDebug --appIdSuffix 'dev'",
"android:release": "cd android && ./gradlew assembleProductionRelease",
```

Because we are using Typescript, we need change entry file for release build in android. Bydefault its `index.js` will change it to `intes.tsx` in our case.
`android/app/build.gradle`

```
project.ext.react = [
    enableHermes: false,
    entryFile: "index.tsx" // <--- Add this line
]
```

### Native changes for IOS

For IOS changes for different environment refer to [this](https://blog.logicwind.com/adding-multiple-target/) doc's IOS section.

### Assets

For adding environment based app icons refer to this [tutorial](https://blog.logicwind.com/adding-multiple-target/)
