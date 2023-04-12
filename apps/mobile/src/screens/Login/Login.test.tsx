import {fireEvent, render, screen} from '../../utilities/test-util';
import Login from './Login';

describe('[Screens] - [login]', () => {
  const userNameInputTestId = 'login-username';
  const passwordInputTestId = 'login-password';
  test('should render the login screen', () => {
    const {container} = render(<Login />);
    expect(container).toBeTruthy();
  });

  test('should check if username and password fields are present', () => {
    render(<Login />);

    expect(screen.getByTestId(userNameInputTestId)).toBeTruthy();
    expect(screen.getByTestId(passwordInputTestId)).toBeTruthy();
  });

  test('should accept username input values', () => {
    const userInputChangedText = 'some user';
    render(<Login />);

    const usernameInput = screen.getByTestId(userNameInputTestId);

    fireEvent.changeText(usernameInput, userInputChangedText);

    expect(usernameInput.props.value).toBe(userInputChangedText);
  });
  test('should accept password input values', () => {
    const passwordInputChangedText = 'some password';
    render(<Login />);
    const passwordInput = screen.getByTestId(passwordInputTestId);

    fireEvent.changeText(passwordInput, passwordInputChangedText);

    expect(passwordInput.props.value).toBe(passwordInputChangedText);
  });

  test('should check if the login button is present', () => {
    const loginButtonTestId = 'login-btn';
    render(<Login />);
    const loginButton = screen.getByTestId(loginButtonTestId);

    expect(loginButton).toBeTruthy();
  });
});
