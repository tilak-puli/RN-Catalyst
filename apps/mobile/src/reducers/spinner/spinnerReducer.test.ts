import {SpinnerActionsType} from './spinnerActions';
import loadingReducer, {LoadingState} from './spinnerReducer';

describe('[Reducer] - [LoadingReducer]', () => {
  const initialState: LoadingState = {
    loading: false,
    count: 0,
  };
  let state = initialState;

  beforeEach(() => {
    state = initialState;
  });
  test('should set loading as true when called with SET_LOADING_TRUE', () => {
    state = loadingReducer(state, {type: SpinnerActionsType.SET_LOADING_TRUE});
    expect(state.loading).toBe(true);
    expect(state.count).toBe(1);
  });

  test('should set loading as false when called with SET_LOADING_FALSE', () => {
    state.count = 1;
    state = loadingReducer(state, {type: SpinnerActionsType.SET_LOADING_FALSE});
    expect(state.loading).toBe(false);
    expect(state.count).toBe(0);
  });

  test('should return initial state', () => {
    const newState = loadingReducer(state, {type: 'UNDEFINED'});
    expect(newState).toEqual(initialState);
  });
});
