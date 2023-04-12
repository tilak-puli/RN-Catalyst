import {PropsWithChildren} from 'react';
import {Pressable, Text} from 'react-native';
import useAuth from '../../hooks/useAuth';
import {act, fireEvent, render, screen} from '../../utilities/test-util';
import {AuthProvider, useAuthContext} from './authContext';

const mockInput = {
  username: 'dummy_user',
  password: 'dummy_pass',
};
const mockLogIn = jest.fn();
const mockLogOut = jest.fn();

jest.mock('./authContext', () => ({
  ...jest.requireActual('./authContext'),
  useAuthContext: jest.fn().mockImplementation(() => ({
    logIn: mockLogIn,
    logOut: mockLogOut,
  })),
}));

jest.mock('../../hooks/useAuth', () => () => ({
  authMethods: {
    logIn: mockLogIn,
    logOut: mockLogOut,
  },
}));

const AuthContextProvider = ({children}: PropsWithChildren) => {
  const {authMethods} = useAuth();
  return <AuthProvider authMethods={authMethods}>{children}</AuthProvider>;
};

const AuthContextComponent = () => {
  const {logIn, logOut} = useAuthContext();
  return (
    <>
      <Pressable testID="jest-login-btn" onPress={() => logIn?.(mockInput)}>
        <Text>LogIn</Text>
      </Pressable>

      <Pressable testID="jest-log-out-btn" onPress={logOut}>
        <Text>Log Out</Text>
      </Pressable>
    </>
  );
};

describe('[Context] - [AuthContext]', () => {
  const logInBtnTestID = 'jest-login-btn';
  const loagOutBtnTestID = 'jest-log-out-btn';
  test('should call logIn method login button is pressed', () => {
    render(
      <AuthContextProvider>
        <AuthContextComponent />
      </AuthContextProvider>,
    );

    act(() => {
      fireEvent.press(screen.getByTestId(logInBtnTestID));
    });
    expect(mockLogIn).toBeCalledTimes(1);
    expect(mockLogIn).toBeCalledWith(mockInput);
  });
  test('should call logOut method when log-out button is pressed', () => {
    render(
      <AuthContextProvider>
        <AuthContextComponent />
      </AuthContextProvider>,
    );

    act(() => {
      fireEvent.press(screen.getByTestId(loagOutBtnTestID));
    });
    expect(mockLogOut).toBeCalledTimes(1);
  });
});

export default AuthContextComponent;
