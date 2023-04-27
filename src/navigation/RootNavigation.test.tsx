import {screen, render} from '../utilities/test-util';
import RootNavigation from './RootNavigation';
import {loggedInSelector} from '../state/machines/Selectors';

jest.mock('../state/machines/Selectors', () => ({
  ...jest.requireActual('../state/machines/Selectors'),
  loggedInSelector: jest.fn(),
}));

afterAll(() => {
  global.axiosMock.restore();
});

describe('[Navigation] - [RootNavigation]', () => {
  test('should render authNavigation if userToken is empty', async () => {
    const {findByText} = render(<RootNavigation />);
    const loginScreen = await findByText('Welcome to Catalyst');
    expect(loginScreen).toBeTruthy();
  });

  test('should render appNavigation', async () => {
    const userUrl = `https://jsonplaceholder.typicode.com/users/1`;
    global.axiosMock.onGet(userUrl).reply(200, {
      accessToken: 'dummy_token',
      name: 'someUser',
    });

    loggedInSelector.mockImplementation(() => true);
    render(<RootNavigation />);

    const homeScreen = await screen.findByText('Home');
    expect(homeScreen).toBeTruthy();
  });
});
