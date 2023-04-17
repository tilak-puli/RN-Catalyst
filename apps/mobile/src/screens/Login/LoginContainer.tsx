import {useSelector} from '@xstate/react';
import {useGlobalContext} from '../../context/global/globalContext';
import {loggingInSelector} from '../../state/machines/Selectors';
import {useSpinnerContext} from '../../context/spinner/spinnerContext';
import Login from './Login';
import {LoginInput} from '../../api/auth';

const LoginContainer = () => {
  const globalContext = useGlobalContext();
  const isLogging = useSelector(globalContext.authService, loggingInSelector);
  const {setLoadingFalse, setLoadingTrue} = useSpinnerContext();

  const login = async (data: LoginInput) => {
    globalContext.authService.send({type: 'LOGIN', data});
  };

  return (
    <Login
      isLogging={isLogging}
      setLoadingFalse={setLoadingFalse}
      setLoadingTrue={setLoadingTrue}
      login={login}
    />
  );
};

export default LoginContainer;
