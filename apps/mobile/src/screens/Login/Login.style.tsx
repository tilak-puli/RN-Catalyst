import styled from 'styled-components/native';
import {Text, View, SafeAreaView} from 'react-native';

export const StyledSafeAreaContainer = styled(SafeAreaView)`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;

export const Container = styled(View)`
  flex: 1;
`;

export const StyledLogoText = styled(Text)`
  font-size: 30px;
  font-weight: 800;
  margin-top: 150px;
  margin-bottom: 30px;
  text-align: center;
`;
