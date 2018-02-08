import { PureComponent, createElement } from 'react';
import Component from './collapse-component';

class CollapseContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      opened: false
    };
  }

  handleOnClick = () => {
    this.setState(state => ({
      opened: !state.opened
    }));
  };

  render() {
    return createElement(Component, {
      ...this.props,
      opened: this.state.opened,
      handleOnClick: this.handleOnClick
    });
  }
}

export default CollapseContainer;
