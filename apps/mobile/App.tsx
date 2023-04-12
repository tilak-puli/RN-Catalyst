import {Suspense, useEffect} from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';
import SplashScreen from 'react-native-splash-screen';
import useAuth from './src/hooks/useAuth';
import RootNavigation from './src/navigation/RootNavigation';
import {AuthProvider} from './src/context/auth/authContext';
import './src/i18n';
import ErrorBoundary from './src/components/ErrorHandler/ErrorHandler';
import {SpinnerProvider} from './src/context/spinner/spinnerContext';
import Spinner from './src/components/Spinner';

const queryClient = new QueryClient();

const App = () => {
  const {authState, authMethods} = useAuth();
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <ErrorBoundary>
      <AuthProvider authMethods={authMethods}>
        <QueryClientProvider client={queryClient}>
          <SpinnerProvider>
            {/* Revisit after migrating to react 18 */}
            <Suspense fallback={<Spinner fullScreeMode />}>
              <RootNavigation authState={authState} />
            </Suspense>
          </SpinnerProvider>
        </QueryClientProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;
