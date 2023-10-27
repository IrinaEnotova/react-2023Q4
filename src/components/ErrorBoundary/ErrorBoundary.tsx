import { Component, ErrorInfo } from 'react';
import ErrorBlock from '../ErrorBlock/ErrorBlock';
import { ErrorBoundaryProps, ErrorBoundaryState } from '../../interfaces/interfaces';

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: undefined,
    };
  }

  static getDerivedStateFromError(error: Error) {
    return {
      hasError: true,
      error: error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log('ErrorBoundary caught error!');
    console.error(error);
    console.error(errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorBlock />;
    } else {
      return this.props.children;
    }
  }
}

export default ErrorBoundary;
