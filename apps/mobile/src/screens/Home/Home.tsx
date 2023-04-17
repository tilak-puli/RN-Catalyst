import {Suspense} from 'react';
import {Text} from 'react-native';
import {useQuery} from 'react-query';
import {AuthActions} from '../../api';
import Button from '../../components/Button/Button';
import Spinner from '../../components/Spinner';
import {Container, StyledText} from './Home.style';

const User = () => {
  const {error, data} = useQuery('getUser', () => AuthActions.getUser(1), {
    // suspense: true,
  });
  if (error) return <Text>{`An error has occurred: ${error}`}</Text>;

  return <StyledText>Hello {data?.name}</StyledText>;
};

type HomeProps = {
  logout: () => void;
};

const Home = ({logout}: HomeProps) => (
  <Container>
    <Text>Home</Text>
    <Suspense fallback={<Spinner />}>
      <User />
    </Suspense>
    <Button testID="home-logout-btn" title="Log out" onPress={() => logout()} />
  </Container>
);

export default Home;
