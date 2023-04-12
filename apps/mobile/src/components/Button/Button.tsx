import {
  Button as RNButton,
  ButtonProps as RNButtonProps,
  View,
  ViewStyle,
} from 'react-native';

interface ButtonProps extends RNButtonProps {
  style?: ViewStyle;
}

const Button = ({style = {}, testID, ...rest}: ButtonProps) => {
  const mergedStyles = [style];
  return (
    <View testID={testID} style={mergedStyles}>
      <RNButton
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
      />
    </View>
  );
};
export default Button;
