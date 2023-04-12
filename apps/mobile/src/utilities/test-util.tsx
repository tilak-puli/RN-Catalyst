import {FC, ReactElement, ReactNode} from 'react';
import {render, RenderAPI} from '@testing-library/react-native';
import {QueryClient, QueryClientProvider} from 'react-query';
import {SpinnerProvider} from '../context/spinner/spinnerContext';

const query = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      cacheTime: 0,
    },
  },
});
afterEach(() => {
  query.clear();
});
const AllTheProviders: FC<{children: ReactNode}> = ({children}) => (
  <QueryClientProvider client={query}>
    <SpinnerProvider>{children}</SpinnerProvider>
  </QueryClientProvider>
);

const customRender = (ui: ReactElement, options?: Omit<RenderAPI, 'wrapper'>) =>
  render(ui, {wrapper: AllTheProviders, ...options});

export * from '@testing-library/react-native';
export {customRender as render};
