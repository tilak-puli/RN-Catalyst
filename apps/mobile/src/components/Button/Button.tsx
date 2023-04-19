import {View, ViewStyle} from 'react-native';
import {
  Button as RNEButton,
  ButtonProps as RNEButtonProps,
} from '@rneui/themed';

interface ButtonProps extends RNEButtonProps {
  style?: ViewStyle;
}

const Button = ({style = {}, testID, ...rest}: ButtonProps) => {
  const mergedStyles = [style];
  return (
    <View testID={testID} style={mergedStyles}>
      <RNEButton
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
      />
    </View>
  );
};
export default Button;
