import {Text, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';

export const Container = styled(TouchableOpacity)`
  /* flex: 1, */
  justify-content: center;
  align-items: flex-start;
  background-color: #fff;
  border-color: #eaeaea;
  border-radius: 5px;
  border-width: 1px;
  height: 43px;
  margin: 10px 0px;
  padding: 0 10px;
`;

export const StylediosText = styled(Text)`
  font-size: 14px;
  /* text-align:center ; */
`;
