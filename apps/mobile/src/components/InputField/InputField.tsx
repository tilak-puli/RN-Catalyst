import {TextInput, TextInputProps, View} from 'react-native';
import useStyles from './InputField.style';

const InputField = ({style, ...rest}: TextInputProps) => {
  const styles = useStyles();
  return (
    <View>
      <TextInput
        style={[styles.text, style]}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
      />
    </View>
  );
};

export default InputField;
