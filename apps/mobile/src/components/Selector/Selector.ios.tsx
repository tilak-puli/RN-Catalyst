import {PickerProps} from '@react-native-picker/picker';
import React, {useMemo} from 'react';
import {ActionSheetIOS, Text, TouchableOpacity} from 'react-native';
import useStyles from './Selector.style';

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
  const styles = useStyles();
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
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      testID={testID}>
      <Text style={styles.text} testID="selector-selected-value">
        {selectedLabel}
      </Text>
    </TouchableOpacity>
  );
};

export default Selector;
