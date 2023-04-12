// ==============================
// Base on https://github.com/commitizen/cz-conventional-changelog
// ==============================

const {types} = require('./commit_types.json');

const issueRegEx = /^((fix)|(re))\s\#[1-9][0-9]{0,4}$/g;
const pairRegEx = /^\w{3,15}(\/\w{3,15}){1,2}$/g;
const alphaNumericRegEx = /^[a-zA-Z0-9_ ]*$/g;
const longMessageRegEx = /^[a-zA-Z\d-_\/\(\) ]+$/g;

const alphaNumericValidator = value =>
  value.match(alphaNumericRegEx) ? true : 'input should be alphanumeric only';

const longMessageValidator = value =>
  value
    ? value.match(longMessageRegEx)
      ? true
      : 'input should not contain any special symbol'
    : true;

/**
 * @typedef {{type: string; scope: string; subject: string; body: string; isBreaking: boolean; breakingBody: string; breaking: string; isIssueAffected: boolean; issuesBody: string; issues: string;}} Answers
 */

/** @type import('cz-format-extension').Config<Answers> */
module.exports = {
  questions({inquirer}) {
    return [
      {
        type: 'list',
        name: 'type',
        message: "Select the type of change that you're committing",
        choices: types,
      },
      {
        type: 'input',
        name: 'scope',
        message:
          'What is the scope of this change (e.g. component or file name): (press enter to skip)\n',
        validate: alphaNumericValidator,
      },
      {
        type: 'input',
        name: 'pair',
        message:
          'Provide working dev pair names (e.g. dev1/dev2): (press enter to skip)\n',
        validate: pair =>
          pair
            ? pair.match(pairRegEx)
              ? true
              : 'pair names should be in given format (e.g. dev1/dev2)(max 15 chars per dev)'
            : true,
      },
      {
        type: 'input',
        name: 'subject',
        message:
          'Write a short, imperative tense description of the change (max 95 chars)\n',
        validate: subject =>
          subject.length === 0 ? 'subject is required' : true,
      },
      {
        type: 'input',
        name: 'body',
        message:
          'Provide a longer description of the change: (press enter to skip)\n',
        validate: longMessageValidator,
      },
      {
        type: 'confirm',
        name: 'isBreaking',
        message: 'Are there any breaking changes?',
        default: false,
      },
      {
        type: 'input',
        name: 'breakingBody',
        default: '-',
        message:
          'A BREAKING CHANGE commit requires a body. Please enter a longer description of the commit itself:\n',
        when: answers => answers.isBreaking && !answers.body,
        validate: longMessageValidator,
      },
      {
        type: 'input',
        name: 'breaking',
        message: 'Describe the breaking changes:\n',
        when: answers => answers.isBreaking,
      },
      {
        type: 'confirm',
        name: 'isIssueAffected',
        message: 'Does this change affect any open issues?',
        default: false,
      },
      {
        type: 'input',
        name: 'issuesBody',
        default: '-',
        message:
          'If issues are closed, the commit requires a body. Please enter a longer description of the commit itself:\n',
        when: answers =>
          answers.isIssueAffected && !answers.body && !answers.breakingBody,
        validate: longMessageValidator,
      },
      {
        type: 'input',
        name: 'issues',
        message: 'Add issue references (e.g. "fix #123", "re #123".):\n',
        when: answers => answers.isIssueAffected,
        default: undefined,
        validate: issues =>
          issues.length === 0
            ? 'issues is required'
            : issues.match(issueRegEx)
            ? true
            : 'invalid issue format',
      },
    ];
  },
  commitMessage({answers}) {
    const scope = answers.scope ? `(${answers.scope})` : '';
    const pair = answers.pair ? `[${answers.pair}]` : '';
    const head = `${answers.type}${scope}:${pair} ${answers.subject}`;
    const body = answers.body ? answers.body : '';
    const breaking = answers.breaking
      ? `BREAKING CHANGE: ${answers.breaking}`
      : '';
    const issues = answers.issues ? answers.issues : '';

    return [head, body, breaking, issues].join('\n\n').trim();
  },
};
