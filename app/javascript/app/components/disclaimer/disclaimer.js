import { createElement, PureComponent } from 'react';
import { DISCLAIMER_SHOWN } from 'data/constants';
import Component from './disclaimer-component';

class DisclaimerContainer extends PureComponent {
  constructor() {
    super();
    this.state = {
      hasBeenShown: JSON.parse(localStorage.getItem(DISCLAIMER_SHOWN))
    };
  }

  handleOnRequestClose() {
    this.setState({ hasBeenShown: true });
    localStorage.setItem(DISCLAIMER_SHOWN, 'true');
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
