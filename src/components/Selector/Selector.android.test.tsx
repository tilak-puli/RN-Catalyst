import {render} from '../../utilities/test-util';
import SelectorAndroid from './Selector.android';

const options = [
  {label: 'Option 1', value: 'option1'},
  {label: 'Option 2', value: 'option2'},
];

jest.mock('');
describe('Component] - [Selector-Android]', () => {
  test('should render selector component correctly for android', () => {
    const select = render(<SelectorAndroid options={options} />);
    expect(select).toMatchSnapshot();
  });
});
