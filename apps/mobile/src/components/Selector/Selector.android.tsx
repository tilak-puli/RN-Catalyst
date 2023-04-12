import {Picker, PickerProps} from '@react-native-picker/picker';

type Option = {
  label: string;
  value: string;
};

interface SelectorProps extends PickerProps {
  options: Option[];
}

const Selector = ({options, style, ...props}: SelectorProps) => {
  const mergedStyle = [style];
  return (
    <Picker
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      style={mergedStyle}>
      {options.map(({label, value}) => (
        <Picker.Item
          key={value}
          testID={`selector-option-${value}`}
          label={label}
          value={value}
        />
      ))}
    </Picker>
  );
};

export default Selector;
