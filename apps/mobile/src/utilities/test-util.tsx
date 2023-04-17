import {FC, ReactElement, ReactNode} from 'react';
import {render, RenderAPI} from '@testing-library/react-native';
import {QueryClient, QueryClientProvider} from 'react-query';
import {SpinnerProvider} from '../context/spinner/spinnerContext';
import {GlobalContextProvider} from '../context/global/globalContext';

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

const customRender = (ui: ReactElement, options?: Omit<RenderAPI, 'wrapper'>) =>
  render(ui, {wrapper: AllTheProviders, ...options});

const AllTheProviders: FC<{children: ReactNode}> = ({children}) => (
  <GlobalContextProvider>
    <QueryClientProvider client={query}>
      <SpinnerProvider>{children}</SpinnerProvider>
    </QueryClientProvider>
  </GlobalContextProvider>
);

export * from '@testing-library/react-native';
export {customRender as render};
