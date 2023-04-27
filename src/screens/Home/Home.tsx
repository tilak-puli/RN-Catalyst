import {Suspense} from 'react';
import {Text, View} from 'react-native';
import {useQuery} from 'react-query';
import {AuthActions} from '../../api';
import Button from '../../components/Button/Button';
import Spinner from '../../components/Spinner';
import useStyles from './Home.style';

const User = () => {
  const styles = useStyles();
  const {error, data} = useQuery('getUser', () => AuthActions.getUser(1), {
    // suspense: true,
  });
  if (error) return <Text>{`An error has occurred: ${error}`}</Text>;

  return <Text style={styles.text}>Hello {data?.name}</Text>;
};

type HomeProps = {
  logout: () => void;
};

const Home = ({logout}: HomeProps) => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Suspense fallback={<Spinner />}>
        <User />
      </Suspense>
      <Button
        testID="home-logout-btn"
        title="Log out"
        onPress={() => logout()}
      />
    </View>
  );
};

export default Home;
