import InputField from './InputField';
import {render, screen} from '../../utilities/test-util';

describe('[Component] - [InputField] ', () => {
  test('should render text input correctly', () => {
    const input = render(
      <InputField placeholder="Username" accessibilityLabel="Username" />,
    );
    expect(input).toMatchSnapshot();
  });

  test('should match background color', () => {
    render(
      <InputField
        testID="test-input"
        placeholder="Username"
        accessibilityLabel="Username"
      />,
    );

    expect(screen.getByTestId('test-input')).toHaveStyle({
      backgroundColor: '#FAFAFA',
    });
  });
});
