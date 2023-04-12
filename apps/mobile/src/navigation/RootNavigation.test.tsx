import {render, screen} from '../utilities/test-util';
import RootNavigation from './RootNavigation';

afterAll(() => {
  global.axiosMock.restore();
});
describe('[Navigation] - [RootNavigation]', () => {
  test('should render authNavigation if userToken is empty', async () => {
    const component = <RootNavigation authState={{userToken: ''}} />;

    const {findByText} = render(component);
    const loginScreen = await findByText('Welcome to Catalyst');
    expect(loginScreen).toBeTruthy();
  });

  test('should render appNavigation if userToken is not empty', async () => {
    global.axiosMock
      .onGet(`https://jsonplaceholder.typicode.com/users/1`)
      .reply(200, {name: 'dummy_user'});

    const component = (
      <RootNavigation
        authState={{
          userToken: 'dummy_token',
        }}
      />
    );

    render(component);
    const homeScreen = await screen.findByText('Home');
    expect(homeScreen).toBeTruthy();
  });
});
