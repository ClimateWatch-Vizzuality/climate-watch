import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends Component {
  static getDerivedStateFromError(/* error */) {
    return { hasError: true };
  }

  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  /* componentDidCatch(error, errorInfo) {
   *   logErrorToMyService(error, errorInfo);
   * } */

  render() {
    const { className, errorMessage } = this.props;

    if (this.state.hasError) {
      return <div className={className}>{errorMessage}</div>;
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  errorMessage: PropTypes.string
};

ErrorBoundary.defaultProps = {
  errorMessage: 'Something went wrong.'
};

export default ErrorBoundary;
