# Spinner

- [Spinner](#spinner)
  - [Overview](#overview)
  - [Limitations](#limitations)
    - [Possible fixes which worked](#possible-fixes-which-worked)

## Overview

In React 18 Suspense comes with data fetching support. In our starter kit we are using Spinner with two different modes. One is **Full Screen Mode** and second is **View Mode**.

**Full Screen Mode** uses `Modal` for showing loader/spinner and it covers the whole screen. The root level `Suspense` is using this spinner as a fallback or we can trigger it using `SpinnerContext` as well.

**View Mode** uses `View` for showing loader and it's only limited to its parent View, it will not cover the entire screen. All sub level `Suspense` can use this loader as a fallback for suspended UI part

## Limitations

In iOS, there is a limit that we can have only one Modal open at a time.
Fore more information: you can check this issue on github [here](https://github.com/react-native-modal/react-native-modal/issues/30)

### Possible fixes which worked

- patching the react native library for supporting multiple modals, the details can be found [here](https://github.com/react-native-modal/react-native-modal/issues/30#issuecomment-843104049).
- Instead of `patch-package` library we can use `yarn patch`
- Run `yarn workspace mobile patch react-native` from repository's root.
- Follow the steps from from above command output, and make changes according to this [link](https://github.com/facebook/react-native/pull/31498/files).

```
$ yarn workspace mobile patch react-native

➤ YN0000: Package react-native@npm:0.69.3 got extracted with success!

➤ YN0000: You can now edit the following folder: /private/var/folders/tn/qm9px2l556l7fjm26d3twcdh0000gn/T/xfs-25c991d5/user

➤ YN0000: Once you are done run yarn patch-commit -s /private/var/folders/tn/qm9px2l556l7fjm26d3twcdh0000gn/T/xfs-25c991d5/user and Yarn will store a patch file based on your changes.
```

- Then as a final step, run `yarn install` to use the patched version of library, which supports multiple modals in ios.
