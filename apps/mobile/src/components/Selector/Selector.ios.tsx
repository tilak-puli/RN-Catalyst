import {PickerProps} from '@react-native-picker/picker';
import {useMemo} from 'react';
import {ActionSheetIOS} from 'react-native';
import {Container, StylediosText} from './Selector.style';

type Option = {
  label: string;
  value: string;
};

interface SelectorProps extends PickerProps {
  options: Option[];
}

const Selector = ({
  // style,
  options,
  selectedValue,
  onValueChange,
  testID,
}: SelectorProps) => {
  const onPress = () =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Cancel', ...options.map(({label}) => label)],
        cancelButtonIndex: 0,
      },
      buttonIndex => {
        if (buttonIndex !== 0) {
          onValueChange?.(options[buttonIndex - 1].value, buttonIndex - 1);
        }
      },
    );
  const selectedLabel = useMemo(() => {
    if (selectedValue) {
      const labelIndex = options.findIndex(val => val.value === selectedValue);
      return options[labelIndex].label;
    }
    return undefined;
  }, [selectedValue, options]);

  return (
    <Container onPress={onPress} testID={testID}>
      <StylediosText testID="selector-selected-value">
        {selectedLabel}
      </StylediosText>
    </Container>
  );
};

export default Selector;
