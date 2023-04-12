# CI

- [CI](#ci)
  - [Continuous Integration and Deployment](#continuous-integration-and-deployment)
  - [GitHub Actions as a CI/CD tool](#github-actions-as-a-cicd-tool)
  - [Continuos integration workflow](#continuos-integration-workflow)
  - [Secrets Management](#secrets-management)

## Continuous Integration and Deployment

Continuous integration (CI) is a software practice that requires frequently committing code to a repository.

It helps in merging code changes back to a shared branch more frequently.
Once a developer’s changes to an application are merged, those changes are validated by automatically building workflows.
These workflows build and test everything from classes and function to the different modules that comprise the entire app.
If automated testing discovers a conflict between new and existing code, CI makes it easier to fix those bugs quickly and often.

When you commit code to your repository, you can continuously build and test the code to make sure that the commit doesn't introduce errors. Your tests can include

- Static analysis (ex: linters)
- Security checks ()
- Unit tests and code coverage
- Functional tests

## GitHub Actions as a CI/CD tool

GitHub Actions is designed to help simplify workflows with flexible automation and offer easy-to-use CI/CD capabilities built by developers for developers.
Compared with other automation or CI/CD tools, GitHub Actions offers native capabilities right in your GitHub flow.
It also makes it easy to leverage any of the 10,000+ pre-written and tested automation and CI/CD actions in the GitHub Marketplace
as well as the ability to write your own with easy-to-use YAML files.

You can configure your CI workflow to run when a GitHub event occurs (for example, when new code is pushed to your repository), on a set schedule, or when an external event occurs using the repository dispatch webhook.

GitHub runs all the actions and provides the results of all steps in the pull requests as well, so you can see whether the change in your branch introduces an error. When all CI tests in a workflow pass, the changes you pushed are ready to be reviewed by a team member or merged.

This whole process can be automated by adding a single file to your repository. Each Action consists of a workflow definition file that is placed in the `.github/workflows/` folder. The workflow is composed of a number of actions that either run a script directly or use available github actions for particular tool.

## Continuos integration workflow

Click the "Actions" tab on your repo. Under the workflows you will find all workflow yml files.
In the editor you can find workflow files at the given path:
[CI Workflow](../../.github/workflows/ci.yaml)

- Runs on each commit
- Run vulnerability checking in dependencies
- Run TruffleHog for scanning credentials on all the branches and commits
- Run static analysis using different tools
  - ESlint
  - Prettier
- Run test cases
  - Run unit tests

## Secrets management

- All the environment variables and secrets are stored in github in repository scope. We use [gh cli](https://cli.github.com/manual/gh_secret_set) to set secrets.

- We can also store secret files as Github secrets in the following way.

  - Encode the files content to base64.
  - Add these encoded content in github secret.
  - In the workflow file, decode the github secret env variable and store it in a file before usage.

        ```bash
        $ base64 -i firebase_credentials.json | pbcopy
        $ gh secret set FIREBASE_CREDENTIALS #press enter and paste the secret

        ```

  - To use the secret in workflow, we can use this syntax `${{ secrets.ENV_VAR }}`
