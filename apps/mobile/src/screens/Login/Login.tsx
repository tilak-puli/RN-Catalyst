import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import Button from '../../components/Button/Button';
import InputField from '../../components/InputField/InputField';
import LanguageSelector from '../../components/LanguageSelector/LanguageSelector';
import {useAuthContext} from '../../context/auth/authContext';
import {
  Container,
  StyledLogoText,
  StyledSafeAreaContainer,
} from './Login.style';

const Login = () => {
  const {logIn} = useAuthContext();
  const {t} = useTranslation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    await logIn?.({username, password});
  };

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
