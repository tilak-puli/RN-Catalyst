import {ActivityIndicator} from 'react-native';
import {StyledView} from './ViewSpinner.style';

export const ViewLoader = () => (
  <StyledView testID="global-suspense-loader">
    <ActivityIndicator color="black" size="large" />
  </StyledView>
);
