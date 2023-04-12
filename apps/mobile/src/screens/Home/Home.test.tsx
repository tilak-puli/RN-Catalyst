import {render, screen, waitFor} from '../../utilities/test-util';
import Home from './Home';

global.axiosMock
  .onGet(`https://jsonplaceholder.typicode.com/users/1`)
  .reply(200, {name: 'dummy_user'});

afterAll(() => {
  global.axiosMock.restore();
});
describe('[Screens] - [Home]', () => {
  test('should render the home screen When user is logged in', async () => {
    const {container} = render(<Home />);
    await waitFor(() => screen.getByText('Home'));
    expect(container).toBeTruthy();
  });
  test('should have log out button on screen', async () => {
    const logOutButtonTestId = 'home-logout-btn';
    render(<Home />);
    await waitFor(() => screen.getByText('Home'));
    const logoutButton = screen.getByTestId(logOutButtonTestId);
    expect(logoutButton).toBeTruthy();
  });
});
