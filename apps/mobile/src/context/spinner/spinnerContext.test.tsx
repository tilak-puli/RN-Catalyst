import {Pressable, Text} from 'react-native';
import {fireEvent, render, screen} from '../../utilities/test-util';
import {SpinnerProvider, useSpinnerContext} from './spinnerContext';

const SampleLoaderContext = () => {
  const {setLoadingFalse, setLoadingTrue} = useSpinnerContext();
  return (
    <>
      <Pressable testID="jest-loading-true-btn" onPress={setLoadingTrue}>
        <Text>Loading true</Text>
      </Pressable>

      <Pressable testID="jest-loading-false-btn" onPress={setLoadingFalse}>
        <Text>Loading false</Text>
      </Pressable>
    </>
  );
};

describe('[Context] - [LoaderContext]', () => {
  const globalLoaderModalTestID = 'global-loader-modal';
  const loadingTrueBtnTestID = 'jest-loading-true-btn';
  const loadingFalseBtnTestID = 'jest-loading-false-btn';
  test('should show and hide loading screen based on loading state', () => {
    render(
      <SpinnerProvider>
        <SampleLoaderContext />
      </SpinnerProvider>,
    );

    fireEvent.press(screen.getByTestId(loadingTrueBtnTestID));
    expect(screen.getByTestId(globalLoaderModalTestID)).toBeTruthy();

    fireEvent.press(screen.getByTestId(loadingFalseBtnTestID));
    expect(screen.queryByTestId(globalLoaderModalTestID)).toBeFalsy();
  });
});

export default SampleLoaderContext;
