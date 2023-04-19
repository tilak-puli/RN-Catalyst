import {ActivityIndicator, View} from 'react-native';
import useStyles from './ViewSpinner.style';

export const ViewLoader = () => {
  const styles = useStyles();

  return (
    <View style={styles.view} testID="global-suspense-loader">
      <ActivityIndicator color="black" size="large" />
    </View>
  );
};
