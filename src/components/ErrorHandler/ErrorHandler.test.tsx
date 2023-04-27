import {render, screen} from '../../utilities/test-util';
import ErrorBoundary from './ErrorHandler';

describe('[Component] - [Error Handler]', () => {
  test('should render Error page when there is an uncaught error', () => {
    jest.spyOn(console, 'error').mockImplementation(jest.fn());
    const ThrowError = () => {
      throw new Error('Test');
    };

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>,
    );

    expect(screen.getByTestId('error-fallback-page')).toBeTruthy();
  });
});
