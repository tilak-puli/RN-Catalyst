import {Suspense, useEffect} from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import {ThemeProvider} from '@rneui/themed';
import RootNavigation from './src/navigation/RootNavigation';
import './src/i18n';
import ErrorBoundary from './src/components/ErrorHandler/ErrorHandler';
import {SpinnerProvider} from './src/context/spinner/spinnerContext';
import Spinner from './src/components/Spinner';
import {GlobalContextProvider} from './src/context/global/globalContext';
import theme from './src/styles/theme';

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <SafeAreaProvider>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <GlobalContextProvider>
            <ThemeProvider theme={theme}>
              <SpinnerProvider>
                {/* Revisit after migrating to react 18 */}
                <Suspense fallback={<Spinner fullScreeMode />}>
                  <RootNavigation />
                </Suspense>
              </SpinnerProvider>
            </ThemeProvider>
          </GlobalContextProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </SafeAreaProvider>
  );
};

export default App;
