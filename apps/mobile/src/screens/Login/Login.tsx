import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useAtom} from 'jotai';
import Button from '../../components/Button/Button';
import InputField from '../../components/InputField/InputField';
import LanguageSelector from '../../components/LanguageSelector/LanguageSelector';
import {
  Container,
  StyledLogoText,
  StyledSafeAreaContainer,
} from './Login.style';
import {authAtom} from '../../state/machines/Auth';
import {useSpinnerContext} from '../../context/spinner/spinnerContext';

const Login = () => {
  const {t} = useTranslation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authState, sendToAuthState] = useAtom(authAtom);
  const isLogging = authState.matches('login.progress');
  const {setLoadingFalse, setLoadingTrue} = useSpinnerContext();

  const handleLogin = async () => {
    sendToAuthState({type: 'LOGIN', data: {username, password}});
  };

  useEffect(() => {
    if (isLogging) {
      setLoadingTrue();
    } else {
      setLoadingFalse();
    }

    return setLoadingFalse;
  }, [setLoadingTrue, setLoadingFalse, isLogging]);

  return (
    <StyledSafeAreaContainer>
      <Container>
        <LanguageSelector />
        <StyledLogoText>Welcome to Catalyst</StyledLogoText>
        <InputField
          placeholder="Username"
          testID="login-username"
          accessibilityLabel="Username"
          autoCapitalize="none"
          value={username}
          onChangeText={setUsername}
        />
        <InputField
          placeholder="Password"
          testID="login-password"
          accessibilityLabel="Password"
          autoCapitalize="none"
          value={password}
          secureTextEntry
          onChangeText={setPassword}
        />
        <Button
          title={t('LOGIN')}
          testID="login-btn"
          onPress={() => handleLogin()}
        />
      </Container>
    </StyledSafeAreaContainer>
  );
};

export default Login;
