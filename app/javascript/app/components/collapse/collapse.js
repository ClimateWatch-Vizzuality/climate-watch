import { PureComponent, createElement } from 'react';
import Proptypes from 'prop-types';
import { withState } from 'recompose';
import Component from './collapse-component';

const withOpen = withState('opened', 'handleToggleCollapse', false);

class CollapseContainer extends PureComponent {
  handleOnClick = () => {
    this.props.handleToggleCollapse(c => !c);
  };

  render() {
    return createElement(Component, {
      ...this.props,
      handleOnClick: this.handleOnClick
    });
  }
}

CollapseContainer.propTypes = {
  handleToggleCollapse: Proptypes.func.isRequired
};

export default withOpen(CollapseContainer);
