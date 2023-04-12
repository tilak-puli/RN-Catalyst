## Troubleshooting

#### 1. Failed to Clone Repository : The authenticity of host github (\*\*\*) can't be established.

- Either you need access to NEO portal as a developer

- Generate SSH Key and add it to your Github account and authorize that SSH key and re-login to your github account.

- Refer these:
  - https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent
  - https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account
  - https://docs.github.com/en/enterprise-cloud@latest/authentication/authenticating-with-saml-single-sign-on/authorizing-an-ssh-key-for-use-with-saml-single-sign-on

### 2. App throwing error after babel config change

- For every babel config change we need to reset metro bundler cache to reflect on change.
  Run the below command for do that:

      ```
      yarn workspace mobile start --reset-cache
      ```

      Or inside `mobile` folder

      ```
      yarn start --reset-cache
      ```
