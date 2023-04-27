import {renderHook} from '@testing-library/react-hooks';
import {useInterpret} from '@xstate/react';
import {fireEvent, render, screen} from '../../utilities/test-util';
import LoginContainer from './LoginContainer';
import {GlobalContext} from '../../context/global/globalContext';
import {authMachine} from '../../state/machines/Auth';

describe('[Screens] - [login]', () => {
  const userNameInputTestId = 'login-username';
  const passwordInputTestId = 'login-password';
  const loginButtonTestId = 'login-btn';

  test('should render the login screen', () => {
    const {container} = render(<LoginContainer />);
    expect(container).toBeTruthy();
  });

  test('should check if username and password fields are present', () => {
    render(<LoginContainer />);

    expect(screen.getByTestId(userNameInputTestId)).toBeTruthy();
    expect(screen.getByTestId(passwordInputTestId)).toBeTruthy();
  });

  test('should accept username input values', () => {
    const userInputChangedText = 'some user';
    render(<LoginContainer />);

    const usernameInput = screen.getByTestId(userNameInputTestId);

    fireEvent.changeText(usernameInput, userInputChangedText);

    expect(usernameInput.props.value).toBe(userInputChangedText);
  });
  test('should accept password input values', () => {
    const passwordInputChangedText = 'some password';
    render(<LoginContainer />);
    const passwordInput = screen.getByTestId(passwordInputTestId);

    fireEvent.changeText(passwordInput, passwordInputChangedText);

    expect(passwordInput.props.value).toBe(passwordInputChangedText);
  });

  test('should check if the login button is present', () => {
    render(<LoginContainer />);
    const loginButton = screen.getByTestId(loginButtonTestId);

    expect(loginButton).toBeTruthy();
  });

  test('should check if the clicking login button calls login', () => {
    const username = 'login-user';
    const password = 'login-password';
    const authService = renderHook(() => useInterpret(authMachine)).result
      .current;
    authService.send = jest.fn();

    render(
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      <GlobalContext.Provider value={{authService}}>
        <LoginContainer />
      </GlobalContext.Provider>,
    );

    const loginButton = screen.getByTestId(loginButtonTestId);

    const usernameInput = screen.getByTestId(userNameInputTestId);
    const passwordInput = screen.getByTestId(passwordInputTestId);
    fireEvent.changeText(usernameInput, username);
    fireEvent.changeText(passwordInput, password);
    fireEvent.press(loginButton);

    expect(authService.send).toBeCalledWith({
      type: 'LOGIN',
      data: {username, password},
    });
  });
});
