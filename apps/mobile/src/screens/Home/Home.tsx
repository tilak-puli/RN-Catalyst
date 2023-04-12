import {Suspense} from 'react';
import {Text} from 'react-native';
import {useQuery} from 'react-query';
import {useAtom} from 'jotai';
import {AuthActions} from '../../api';
import Button from '../../components/Button/Button';
import Spinner from '../../components/Spinner';
import {Container, StyledText} from './Home.style';
import {authAtom} from '../../state/machines/Auth';

export type Props = {
  baseEnthusiasmLevel: number;
};

const User = () => {
  const {error, data} = useQuery('getUser', () => AuthActions.getUser(1), {
    // suspense: true,
  });
  if (error) return <Text>{`An error has occurred: ${error}`}</Text>;

  return <StyledText>Hello {data?.name}</StyledText>;
};

const Home = () => {
  // eslint-disable-next-line
  const [_, sendToAuthState] = useAtom(authAtom);

  return (
    <Container>
      <Text>Home</Text>
      <Suspense fallback={<Spinner />}>
        <User />
      </Suspense>
      <Button
        testID="home-logout-btn"
        title="Log out"
        onPress={() => sendToAuthState({type: 'LOGOUT'})}
      />
    </Container>
  );
};

export default Home;
