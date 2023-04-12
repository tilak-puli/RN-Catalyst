# [Testing](#Testing)

- We are using [React Native Testing Library](https://callstack.github.io/react-native-testing-library/) with Jest framework for testing.

### [References](#references)

- Official docs from react native has a very good introduction to different types of testing methodologies. Refer this [link](https://reactnative.dev/docs/testing-overview)
- Another very good resource to get some hands on is https://reactnativetesting.io, which has everything from setting up testing and very good examples to get started.

### [Standard Practices and conventions](#)

- We are following this convention to write outermost
  `describe` -

```
describe("[Component/Screen/Hook/Config/API/Utils] - [Respective Name]",test)
```

- Use `test` keyword instead of `it`.

`it` is an alias of `test`. Start test name with `should`

```
test(name, fn, timeout)
```

- Use screen object to query instead of direct methods returned by render.
  [Recommendation resource](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library#not-using-screen)

- Be sure to `return (or await)` the promise - if you omit the return/await statement, your test will complete before the promise returned from fetchData resolves or rejects. [Reference](https://jestjs.io/docs/asynchronous)
