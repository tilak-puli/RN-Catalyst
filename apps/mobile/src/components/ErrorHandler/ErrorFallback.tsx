import {Image, StyleSheet, View} from 'react-native';
import ErrorImage from '../../assets/images/error.jpg';

const ERROR_IMAGE = Image.resolveAssetSource(ErrorImage).uri;

type ErrorFallbackProps = {
  testID: string;
};

export const ErrorFallback = ({testID}: ErrorFallbackProps) => (
  <View testID={testID} style={styles.errorContainer}>
    <Image
      source={{uri: ERROR_IMAGE}}
      style={styles.image}
      resizeMode="contain"
    />
  </View>
);

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
});
