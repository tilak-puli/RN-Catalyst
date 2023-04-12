import postImposter from '../mountebank-helper.js';
import settings, {user} from '../settings.js';

const accessToken =
  'eyJhbGciOiJIUzI1NiJ9.eyJVc2VybmFtZSI6Im1vdW50ZWJhbmt1c2VyIiwiZXhwIjozODY1MDQ0MzUzLCJpYXQiOjE2NTU5NjkxNTN9.TNATKPexdfrWv4v6nSFsb08Uinsqic03oQCHZ6VeASI';

function userService() {
  const badReqMessage = 'Bad Request';
  const stubs = [
    {
      predicates: [
        {
          equals: {method: 'POST', path: '/signup'},
        },
        {
          exists: {
            body: {
              name: true,
              email: true,
              password: true,
            },
          },
        },
      ],
      responses: [
        {
          is: {
            statusCode: 200,
            headers: {
              'Content-Type': 'application/json',
            },
            body: {
              accessToken: accessToken,
              message: `Welcome ${user.name}`,
              name: user.name,
            },
          },
        },
      ],
    },
    {
      predicates: [
        {
          equals: {method: 'POST', path: '/signup'},
        },
      ],
      responses: [
        {
          is: {
            statusCode: 400,
            headers: {
              'Content-Type': 'application/json',
            },
            body: {
              message: badReqMessage,
            },
          },
        },
      ],
    },
    {
      predicates: [
        {
          equals: {
            method: 'POST',
            path: '/login',
            body: {
              username: user.username,
              password: user.password,
            },
          },
        },
      ],
      responses: [
        {
          is: {
            statusCode: 200,
            headers: {
              'Content-Type': 'application/json',
            },
            body: {accessToken: accessToken, name: 'Mounte Bank'},
          },
        },
      ],
    },
    {
      predicates: [
        {
          equals: {
            method: 'POST',
            path: '/login',
          },
        },
      ],
      responses: [
        {
          is: {
            statusCode: 400,
            headers: {
              'Content-Type': 'application/json',
            },
            body: {message: badReqMessage},
          },
        },
      ],
    },
    {
      responses: [
        {
          is: {statusCode: 404},
        },
      ],
    },
  ];

  const imposter = {
    port: settings.user_service_port,
    protocol: 'http',
    stubs: stubs,
  };

  return postImposter(imposter);
}

export default userService;
