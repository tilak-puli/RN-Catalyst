import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {SafeAreaView, Text, View} from 'react-native';
import Button from '../../components/Button/Button';
import InputField from '../../components/InputField/InputField';
import LanguageSelector from '../../components/LanguageSelector/LanguageSelector';
import useStyles from './Login.style';
import {LoginInput} from '../../api/auth';

type LoginProps = {
  isLogging: boolean;
  setLoadingFalse: () => void;
  setLoadingTrue: () => void;
  login: (data: LoginInput) => void;
};

const Login = ({
  isLogging,
  setLoadingFalse,
  setLoadingTrue,
  login,
}: LoginProps) => {
  const styles = useStyles();
  const {t} = useTranslation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    login({username, password});
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
    <SafeAreaView style={styles.safeAreContainer}>
      <View style={styles.container}>
        <LanguageSelector />
        <Text style={styles.logoText}>Welcome to Catalyst</Text>
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
      </View>
    </SafeAreaView>
  );
};

export default Login;
