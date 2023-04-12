import {SpinnerActionsType} from './spinnerActions';

export type LoadingState = {
  loading: boolean;
  count: number;
};

export type LoadingAction = {
  type: string;
};

const loadingReducer = (
  prevState: LoadingState,
  action: LoadingAction,
): LoadingState => {
  switch (action.type) {
    case SpinnerActionsType.SET_LOADING_TRUE:
      return {
        ...prevState,
        loading: true,
        count: prevState.count + 1,
      };
    case SpinnerActionsType.SET_LOADING_FALSE:
      return {
        ...prevState,
        count: prevState.count - 1,
        loading: prevState.count - 1 > 0,
      };

    default:
      return {
        ...prevState,
      };
  }
};

export default loadingReducer;
