import {Suspense, useEffect} from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';
import SplashScreen from 'react-native-splash-screen';
import RootNavigation from './src/navigation/RootNavigation';
import './src/i18n';
import ErrorBoundary from './src/components/ErrorHandler/ErrorHandler';
import {SpinnerProvider} from './src/context/spinner/spinnerContext';
import Spinner from './src/components/Spinner';
// eslint-disable-next-line import/order
import {useAtom} from 'jotai';
import {authAtom} from './src/state/machines/Auth';

const queryClient = new QueryClient();

const App = () => {
  const [authState] = useAtom(authAtom);

  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <SpinnerProvider>
          {/* Revisit after migrating to react 18 */}
          <Suspense fallback={<Spinner fullScreeMode />}>
            <RootNavigation loggedIn={authState.matches('login.success')} />
          </Suspense>
        </SpinnerProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
