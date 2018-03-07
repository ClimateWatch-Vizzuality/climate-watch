import { createElement, PureComponent } from 'react';
import Component from './disclaimer-component';

class DisclaimerContainer extends PureComponent {
  constructor() {
    super();
    this.state = {
      hasBeenShown: JSON.parse(localStorage.getItem('disclaimerShown'))
    };
  }

  handleOnRequestClose() {
    this.setState({ hasBeenShown: true });
    localStorage.setItem('disclaimerShown', 'true');
  }

  render() {
    return createElement(Component, {
      hasBeenShown: this.state.hasBeenShown,
      handleOnRequestClose: this.handleOnRequestClose.bind(this),
      ...this.props
    });
  }
}

export default DisclaimerContainer;
