import InputField from './InputField';
import {render, screen} from '../../utilities/test-util';
import 'jest-styled-components/native';

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

    expect(screen.getByTestId('test-input')).toHaveStyleRule(
      'background-color',
      '#fafafa',
    );
  });
});
