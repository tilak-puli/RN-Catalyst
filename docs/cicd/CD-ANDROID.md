# CD for android

- [Release Workflow for Android](#release-workflow-for-android)
  - [Tools](#tools)
  - [Signing apps for beta release](#signing-apps-for-beta-release)
  - [Steps in release workflow](#steps-in-release-workflow)
  - [Fastlane and Firebase setup](#fastlane-and-firebase-setup)
  - [Secret/Env required](#secretenv-required)
  - [Version bumping in Android](#version-bumping-in-android)
  - [Tips](#tips)

## Release Workflow for Android

#### Tools

- yarn
- [fastlane](https://docs.fastlane.tools/) (To distribute artifacts to the firebase app distribution)
- ruby bundler (To install all dependency actions of fastlane)
- gradle (Installed by default on Github's Ubuntu image)

#### Signing apps for beta release

Before your application binary is uploaded to "Google Play/Firebase App Distribution", it needs to be signed with an upload key. This upload key is a digitally signed certificate which helps in preventing anyone to tamper with your apps.

- To know why we need signing key, please refer [here](https://stackoverflow.com/questions/23906799/why-should-i-sign-my-apk-before-releasing-to-playstore)
- Steps to create a signing key and sign an application binary can be found [here](https://reactnative.dev/docs/signed-apk-android)
- These are the environment variables are required to sign the app. `APP_UPLOAD_KEY_PASSWORD`, `APP_UPLOAD_STORE_PASSWORD`, `APP_UPLOAD_KEY_ALIAS`, `APP_UPLOAD_SIGNING_KEYSTORE`. These are exported in github actions file.
- Please refer [build.gradle](android/app/build.gradle)'s `signingConfigs` sections.

#### Steps in release workflow

- Refer [release workflow](../../.github/workflows/release-android.yaml)
- Before the actual deployment, we need to run the static-checks and test cases so we run [CI Workflow](../../.github/workflows/ci.yaml) as a dependency.
- Install all the tools mentioned above.
- Cache all the dependencies from ruby, gradle and gradle wrapper. This is useful for faster builds.
- Setting up the secrets, read more about it in [secrets section](#secretenv-management).
- Read more about how we implemented version bumping for releases, refer [version bumping](#version-bumping-in-android)
- Distributing the artifact(.apk) to Firebase app distribution. Please refer [Fastfile](android/fastlane/Fastfile) and [firebase setup](#fastlane-and-firebase-setup)
- Finally, upload mappings.txt, sourcemap file and apk to Github actions using upload action for future reference.

### Fastlane and Firebase setup

- Please refer this article to setup firebase and fastlane: [click here](https://medium.com/firebase-developers/quickly-distribute-app-with-firebase-app-distribution-using-github-actions-fastlane-c7d8eca18ee0)
- Refer this article to setup firebase and fastlane: [click here](https://medium.com/firebase-developers/quickly-distribute-app-with-firebase-app-distribution-using-github-actions-fastlane-c7d8eca18ee0)
- Refer [Fastfile](android/fastlane/Fastfile)
- Good Reads:
  - Official docs: https://docs.fastlane.tools/getting-started/cross-platform/react-native/
  - https://dev-yakuza.posstree.com/en/react-native/fastlane/
  - [Fastlane Setup for android](https://www.raywenderlich.com/26869030-fastlane-tutorial-for-android-getting-started#toc-anchor-015)
  - https://www.runway.team/blog/how-to-build-the-perfect-fastlane-pipeline-for-android

### Secret/Env required

- React native specific env variable
  - All the below environment variables are set in github secrets.
    ```bash
    FIREBASE_CLI_TOKEN #credentials to distribute apk to firebase
    FIREBASE_APP_ID_ANDROID #unique application ID specific to app created on firebase `
    APP_UPLOAD_SIGNING_KEYSTORE=upload-key.keystore #used to sign the apk
    APP_UPLOAD_KEY_PASSWORD #password for above .keystore file
    APP_UPLOAD_STORE_PASSWORD APP_UPLOAD_KEY_ALIAS #alias keyname for signing key
    BUNDLE_VERSION #GITHUB_RUN_NUMBER which increments on each pipeline run
    BUNDLE_SHORT_VERSION #release version taken as github input
    RELEASE_NOTES # release notes taken as github input
    ```
  - The `APP_UPLOAD_SIGNING_KEYSTORE` and `FIREBASE_CREDENTIALS` should be decoded by following the above mentioned process. Please check step `Setup secrets` in [release-android.yaml](../../.github/workflows/release-android.yaml)

### Version bumping in Android

- There are two versions, that needs to increased. One is versionCode(build number) and versionName(release number). These properties are present in `build.gradle` file.
- An artifact can be created with provided properties using fastlanes `gradle` action (`build.gradle` is not updated)
- `versionCode (BUNDLE_VERSION)` is incremented automatically using the current build number(GITHUB_RUN_NUMBER) provided by github, this is unique and is always increasing.
- `versionName (BUNDLE_SHORT_VERSION)` is passed as an input parameter from github actions before triggering the workflow.
- Release notes can be passed as input parameter in github worflow run.

Read more : [Increment Version and Build Numbers with fastlane](https://spin.atomicobject.com/2022/02/10/version-fastlane/)

### Tips

- To increase performance in multiple environment setup, we can promote same JS bundle to next environments.
- Use suply action to promote artifacts to play store [suply](https://docs.fastlane.tools/actions/supply/)
- Store sourcemap, mapping.txt and apk for each build on gihub actions as artifacts(this is needed to keep track of version for debugging, if we want to quickly download the apk for particular build)
