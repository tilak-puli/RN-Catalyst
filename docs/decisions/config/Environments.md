# Environment Config Lib

Status: [ accepted ] \
Deciders: [Livingston samuel, Chinnasamy Chinnaraj]\
Date: [2022-07-25]\
Technical Story: [https://github.com/Regional-IT-India/catalyst-ui-reactnative-starter/issues/10]

### Context

- Configure environments for development, staging and production separately. Create a class for efficiently access of the ENV variables.

### Considered Options

- [React Native Config](https://github.com/luggit/react-native-config)
- [Dot Env](https://www.npmjs.com/package/dotenv)

### Recommendation

Both were recommended on react native official documentation site. But in this RN starter kit we are using React Native Config because

- It has recent release with latest changes.
- Dotenv also has few deprecated stuff.

Also, react-native-config seems quite popular based on https://github.com/luggit/react-native-config/
