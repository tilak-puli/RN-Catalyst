import {ActivityIndicator, Modal, View} from 'react-native';
import useStyles from './ModalSpinner.style';

export const ScreenLoader = () => {
  const styles = useStyles();
  return (
    <Modal
      animationType="fade"
      transparent
      visible
      onRequestClose={() => {
        // Abort all http requests here
      }}>
      <View style={styles.view} testID="global-loader-modal">
        <ActivityIndicator color="black" size="large" />
      </View>
    </Modal>
  );
};
