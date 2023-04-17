import {Suspense, useEffect} from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';
import SplashScreen from 'react-native-splash-screen';
import RootNavigation from './src/navigation/RootNavigation';
import './src/i18n';
import ErrorBoundary from './src/components/ErrorHandler/ErrorHandler';
import {SpinnerProvider} from './src/context/spinner/spinnerContext';
import Spinner from './src/components/Spinner';
import {GlobalContextProvider} from './src/context/global/globalContext';

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <GlobalContextProvider>
          <SpinnerProvider>
            {/* Revisit after migrating to react 18 */}
            <Suspense fallback={<Spinner fullScreeMode />}>
              <RootNavigation />
            </Suspense>
          </SpinnerProvider>
        </GlobalContextProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
