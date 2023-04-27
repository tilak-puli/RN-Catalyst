import Button from './Button';
import {act, fireEvent, render, screen} from '../../utilities/test-util';

describe('[Component] - [Button]', () => {
  test('should render button component correctly', () => {
    const button = render(<Button title="Press me" onPress={jest.fn()} />);
    expect(button).toMatchSnapshot();
  });

  test('should be clickable', () => {
    const mockFunction = jest.fn();
    render(
      <Button title="Press me" testID="buttonClick" onPress={mockFunction} />,
    );
    act(() => {
      fireEvent.press(screen.getByTestId('buttonClick'));
    });

    expect(mockFunction).toBeCalledTimes(1);
  });
});
