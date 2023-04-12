import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from 'react';
import Spinner from '../../components/Spinner';
import {SpinnerActionsType} from '../../reducers/spinner/spinnerActions';
import loadingReducer from '../../reducers/spinner/spinnerReducer';

type GlobalLoaderState = {
  loading: boolean;
  setLoadingFalse: () => void;
  setLoadingTrue: () => void;
};

const SpinnerContext = createContext({} as GlobalLoaderState);

export const SpinnerProvider = ({children}: PropsWithChildren) => {
  const [loadingState, dispatch] = useReducer(loadingReducer, {
    loading: false,
    count: 0,
  });

  const setLoadingTrue = useCallback(() => {
    dispatch({type: SpinnerActionsType.SET_LOADING_TRUE});
  }, []);
  const setLoadingFalse = useCallback(() => {
    dispatch({type: SpinnerActionsType.SET_LOADING_FALSE});
  }, []);

  const providerState = useMemo(
    () => ({loading: loadingState.loading, setLoadingFalse, setLoadingTrue}),
    [loadingState.loading, setLoadingFalse, setLoadingTrue],
  );

  return (
    <SpinnerContext.Provider value={providerState}>
      {loadingState.loading && <Spinner fullScreeMode />}
      {children}
    </SpinnerContext.Provider>
  );
};

export const useSpinnerContext = () => useContext(SpinnerContext);
