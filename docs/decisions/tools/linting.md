# Linting

Status: [ accepted ] \
Deciders: [Livingston samuel, Chinnasamy Chinnaraj]\
Date: [2022-05-30]\
Technical Story: [https://github.com/Regional-IT-India/catalyst-ui-reactnative-starter/issues/4#issue-1252528286]

### Context

- How to enforce best practices/naming conventions while writing code ?
- How to have a common/standard pattern for commit messages ?

### Considered Options

#### For Static code analyzer

- [ESLint](https://eslint.org)

#### For Commit messages

- [commitizen](https://commitizen-tools.github.io/commitizen/)

### Description

#### ESLint

ESLint statically analyzes your code to quickly find problems. It is built into most text editors and you can run ESLint as part of your continuous integration pipeline. Some key features are as follows:

- Warn about deprecated syntax, unused declarations.
- Enforce best practices, naming conventions
- Plugins availability

#### Commitizen

Commitizen define a standard way of committing rules and communicating it (using the cli provided by commitizen) and we can customize the format as per our need. Also there are many plugins available for commitizen like we can use it with `commitlint` lib as well etc.
