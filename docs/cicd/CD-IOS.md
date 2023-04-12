# CD for ios

- [Release Workflow for ios](#release-workflow-for-ios)
  - [Tools](#tools)
  - [Signing iOS apps](#signing-ios-apps)
  - [Fastlane match](#fastlane-match)
  - [React native starter kit decisions for iOS app signing](#react-native-starter-kit-decisions-for-ios-app-signing)
  - [Steps in release workflow](#steps-in-release-workflow)
  - [Fastlane setup](#fastlane-setup)
  - [Firebase setup](#firebase-setup)
  - [Secret/Env required](#secretenv-required)
  - [Version bumping in Android](#version-bumping-in-android)
  - [Tips](#tips)
  - [Additional References](#good-reads)

## Release Workflow for iOS

#### Tools

- yarn
- [fastlane](https://docs.fastlane.tools/) (To distribute artifacts to the firebase app distribution)
- ruby bundler (To install all dependency actions of fastlane)
- Xcode 13.4 (set the version for xcode on Github's mac-os image)

### Signing iOS apps

Signing your app assures users that it is from a known source and the app hasn’t been modified since it was last signed. Before your app can integrate app services, be installed on a device, or be submitted to the App Store, it must be signed with a certificate issued by Apple

To know more about signing the ios app - [iOS Code Signing, Development and Distribution Provisioning Profiles explained](https://getupdraft.com/blog/ios-code-signing-development-and-distribution-prov)

A full guide is available on the fastlane doc, describing the best approaches for your [code signing process](https://docs.fastlane.tools/codesigning/getting-started/).

### Fastlane match

match creates all required certificates & provisioning profiles and stores them in a separate git repository, Google Cloud, or Amazon S3. Every team member with access to the selected storage can use those credentials for code signing.

More details - [Fastlane tools](https://docs.fastlane.tools/actions/match/)

### React native starter kit decisions for iOS app signing

1. To setup provisioning profile, we are creating a private GIT repo.
2. We have got access to `Apple Developer Program Enterprise (ADPE)`
3. For ditribution we are using `adhoc profile` (needs device to be whitelisted on ADP/ADPE)
4. Using firebase cli token for authentication

### Steps in release workflow

1. Setup fastlane for ios
2. Create separate keychain to store signing certificates and provisioning profiles
3. Fetch the certificates and provisioning profiles from private git repo. Setup Deploy keys in the git private repo for ssh authentication.
4. Build the ipa . Building the release ipa locally needs some [changes](#tips) for signing.
5. Distribute it to firebase using firebase cli token.

   Refer the fasfile for more details - [Fastfile](../../apps/mobile/ios/fastlane/Fastfile)

### Fastlane setup

Refer this article to setup fastlane match setup : [IOS fastlane](https://shift.infinite.red/simple-react-native-ios-releases-4c28bb53a97b)

- Run the following in your project folder to start using match:

  ```
  fastlane match init
  ```

- Use git and provide the private git repo URL.

  - Passphrase (Git Repo storage only)

  - When running match for the first time on a new machine, it will ask you for the passphrase for the Git repository. This is an additional layer of security: each of the files will be encrypted using openssl. Make sure to remember the password, as you'll need it when you run match on a different machine.

  - To set the passphrase to decrypt your profiles using an environment variable (and avoid the prompt) use MATCH_PASSWORD

  - You can easily migrate to another storage. Steps are mentioned in the offical doc

- A Matchfile will be created. Open it and change the profile type (e.g. appstore, adhoc) and add your Apple developer account under username.

- To set up the certificates and provisioning profiles on a new machine, you just run the command

  ```
  fastlane match adhoc
  ```

  You will need bundle idetifier handy. Run the above command only once initially to create the certificate and profile.

  You can also run match in a readonly mode to be sure it won't create any new certificates or profiles.

  ```
  fastlane match adhoc -a << BUNDLE_IDENTIFIER >> --readonly
  ```

- It is recommened to create separate keychain for storing signing certifiactes and profiles. [Fastlane action](http://docs.fastlane.tools/actions/create_keychain/#create_keychain) for doing so.

### Firebase setup

To distribute IOS app to firebase app distribution follow this guide [Firebase iOS app distribution using fastlane](https://firebase.google.com/docs/app-distribution/ios/distribute-fastlane)

### Secret/Env required

- React native specific env variable

  - All the below environment variables are set in github secrets.

    ```bash
    FIREBASE_CLI_TOKEN #credentials to distribute apk to firebase
    FIREBASE_APP_ID_IOS #unique application ID specific to app created on firebase `
    KEYCHAIN_PASSWORD #password for keychain to store certs and profiles
    MATCH_PASSWORD #passphrase to access the private git repo
    MATCH_GIT_PRIVATE_KEY #ssh private key file for ssh authentication to private git repo
    BUNDLE_VERSION #GITHUB_RUN_NUMBER which increments on each pipeline run
    BUNDLE_SHORT_VERSION #release version taken as github input
    RELEASE_NOTES # release notes taken as github input

    ```

### Version bumping in iOS

- There are two versions, that needs to increased. One is CFBundleVersion(build number) and CFBundleShortVersionString(release number). These properties are present in `info.plist` file.
- An artifact can be created with provided properties using fastlanes `gym` action (`info.plist` is not updated)
- `CFBundleVersion (BUNDLE_VERSION)` is incremented automatically using the current build number(GITHUB_RUN_NUMBER) provided by github, this is unique and is always increasing.
- `CFBundleShortVersionString (BUNDLE_SHORT_VERSION)` is set from the input passed from github actions before triggering the workflow.
- Release notes can be passed as input parameter in github worflow run.

  Read more : [Increment Version and Build Numbers with fastlane](https://spin.atomicobject.com/2022/02/10/version-fastlane/)

### Tips

- To build the release ipa locally with xcode :

  - Under Project Navigator - Select your porject
  - Select Signing & Capabilities tab,
  - Under Team from the dropdown select your team instead of None, add appropriate profle and certificates
  - Now build your application again.

    This should fix the issue. If you do not see any team, you should see an option under dropdown - "Add an Account..." when you click on it, it will pop up and window where you can add your Apple-ID account or create one.

- Store `.ipa`, `.app.dSYM.zip`, `.app (production release for simulator)` for each build on gihub actions as artifacts(this is needed to keep track of version for debugging, if we want to quickly download the ipa for particular build)
- To create a development and adhoc profile, device must be whitelisted in ADP/ADPE
- To distribute the app to Testflight, need to have app-store profile.
  Follow this guide to upload ipa to Testflight : [Fastlane — Simple React Native iOS Releases](https://shift.infinite.red/simple-react-native-ios-releases-4c28bb53a97b)
- Before signing/joining to Apple developer program / ADPEnterprize, go through the eligibility, offerings and limitations
- To distribute apps for different schemes (production, development, stagging), we will need create separate apps on distribution platform as they have different bundle identifier.
- To speed up the iOS bild, check [this](https://dev.to/retyui/react-native-how-speed-up-ios-build-4x-using-cache-pods-597c)

### Good Reads :

- [Testflight vs Firebase App distribution](https://itnext.io/firebase-app-distribution-vs-testflight-16ade1f6d349)
- [ReactNative - fastlane - appcenter](https://github.com/osamaqarem/reactnative-fastlane-appcenter)
- [Beta build](https://thecodingmachine.github.io/react-native-boilerplate/docs/BetaBuild/)
