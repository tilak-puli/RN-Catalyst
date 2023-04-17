import {useGlobalContext} from '../../context/global/globalContext';
import Home from './Home';

const HomeContainer = () => {
  const globalContext = useGlobalContext();

  const logout = async () => {
    globalContext.authService.send({type: 'LOGOUT'});
  };

  return <Home logout={logout} />;
};

export default HomeContainer;
