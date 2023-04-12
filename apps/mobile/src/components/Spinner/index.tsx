import {ScreenLoader} from './ModalSpinner';
import {ViewLoader} from './ViewSpinner';

type SpinnerProps = {
  fullScreeMode?: boolean;
};

const Spinner = ({fullScreeMode = false}: SpinnerProps) =>
  fullScreeMode ? <ScreenLoader /> : <ViewLoader />;

export default Spinner;
