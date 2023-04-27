import {render} from '../../utilities/test-util';
import {GlobalContextProvider} from './globalContext';

describe('[Global Context]', () => {
  test('should render global context', () => {
    render(<GlobalContextProvider />);
  });
});
