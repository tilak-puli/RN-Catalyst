import {TextInputProps, View} from 'react-native';
import {StyledText} from './InputField.style';

const InputField = ({style, ...rest}: TextInputProps) => (
  <View>
    <StyledText
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      style={style}
    />
  </View>
);

export default InputField;
