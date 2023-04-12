import {ActivityIndicator, Modal} from 'react-native';
import {StyledView} from './ModalSpinner.style';

export const ScreenLoader = () => (
  <Modal
    animationType="fade"
    transparent
    visible
    onRequestClose={() => {
      // Abort all http requests here
    }}>
    <StyledView testID="global-loader-modal">
      <ActivityIndicator color="black" size="large" />
    </StyledView>
  </Modal>
);
