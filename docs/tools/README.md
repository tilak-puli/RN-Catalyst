# Tools

- [Tools](#tools)
  - [Static Code Analysis](#static-code-analysis)
  - [Secret Scanner](#secret-scanner)
  - [Pre commit hooks](#pre-commit-hooks)

## Static Code Analysis

### ESLint

- We rely heavily on [ESLint](https://eslint.org/) for linting and make use of [Airbnb](https://airbnb.io/javascript/) for a consistent code style.
- [Prettier](https://prettier.io/) is also integrated with ESLint to provide automatic formatting.

**Setup**: At root, We have a `.eslintrc.js` file which have basic configuration and plugins for `ts`,`tsx`,`js` and `jsx`. We are extending the same config in each monorepo package and overriding configurations and rules according to that particular package.

## Typescript

Setup for TS is same as we are doing in [ESLint](#eslint) setup.

## Commitizen

For adhering to a commit convention or rules we are using [commitizen](https://commitizen-tools.github.io/commitizen/) and working as a pre commit hook.

## Secret Scanner

- Talisman is a tool that installs a hook to your repository to ensure that potential secrets or sensitive information do not leave the developer's workstation. It validates the outgoing changeset for things that look suspicious - such as potential SSH keys, authorization tokens, private keys etc.
- To add talisman in pre-commit hook, you can run `make pre-commit-hooks`
- We can add the false positive secrets detected by secret scanner in `.talismanrc` file
- Learn more about [git hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks)

## Pre commit hooks

- Pre commit hooks are by default enabled in this starter kit and handled by [Husky](https://typicode.github.io/husky)
- Currently, pre-commit hooks invokes talisman, check for code linting as well as commit message linting
