/* eslint-disable react/destructuring-assignment */
import React, {Component, ErrorInfo, ReactNode} from 'react';
import {ErrorFallback} from './ErrorFallback';

interface Props {
  children?: ReactNode;
  onError?: (error: Error, info: {componentStack: string}) => void;
}

interface State {
  error: Error | null;
}

const initialState: State = {error: null};

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = initialState;
  }

  static getDerivedStateFromError(error: Error): State {
    return {error};
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Uncaught error:', error, info);
    this.props.onError?.(error, info);
  }

  render() {
    const {children} = this.props;
    const {error} = this.state;
    if (error) {
      return (
        // <View>
        // <Text>Sorry.. there was an error</Text>
        <ErrorFallback testID="error-fallback-page" />
        // </View>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
