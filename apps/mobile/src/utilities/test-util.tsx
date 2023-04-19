import {FC, ReactElement, ReactNode} from 'react';
import {render, RenderAPI} from '@testing-library/react-native';
import {QueryClient, QueryClientProvider} from 'react-query';
import {ThemeProvider} from '@rneui/themed';
import {SpinnerProvider} from '../context/spinner/spinnerContext';
import {GlobalContextProvider} from '../context/global/globalContext';
import theme from '../styles/theme';

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
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={query}>
        <SpinnerProvider>{children}</SpinnerProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </GlobalContextProvider>
);

export * from '@testing-library/react-native';
export {customRender as render};
