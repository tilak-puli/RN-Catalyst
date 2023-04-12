import {useState} from 'react';
import {ItemValue} from '@react-native-picker/picker/typings/Picker';
import {act, fireEvent, render, screen} from '../../utilities/test-util';
import SelectorIos from './Selector.ios';

const options = [
  {label: 'Option 1', value: 'option1'},
  {label: 'Option 2', value: 'option2'},
];
const mockOptionToSelectIndex = options.length - 1;

jest.mock('react-native/Libraries/ActionSheetIOS/ActionSheetIOS', () => ({
  showActionSheetWithOptions: jest.fn((items, callback) =>
    callback(mockOptionToSelectIndex + 1),
  ), // selecting second option in list
}));

const testId = 'jest-selector';
const ExampleIosSelector = () => {
  const [value, setValue] = useState('' as ItemValue);
  return (
    <SelectorIos
      testID={testId}
      options={options}
      selectedValue={value}
      onValueChange={val => setValue(val)}
    />
  );
};

describe('[Component] - [Selector - iOS]', () => {
  test('should render selector component for ios', () => {
    const select = render(<SelectorIos options={options} />);
    expect(select).toMatchSnapshot();
  });

  test('should show correct number of items in the selector', async () => {
    render(<ExampleIosSelector />);
    const selector = screen.getByTestId(testId);
    const selectorProps = selector.props;
    const selectorItems = selectorProps.children;
    expect(selectorItems.length).toBe(options.length);
  });

  test('should call onValueChange method when one of the option is selected', async () => {
    const selectedOption = options[mockOptionToSelectIndex];

    render(<ExampleIosSelector />);
    const selector = screen.getByTestId(testId);
    act(() => {
      fireEvent(selector, 'onPress');
    });
    expect(screen.getByTestId('selector-selected-value').props.children).toBe(
      selectedOption.label,
    );
  });
});
