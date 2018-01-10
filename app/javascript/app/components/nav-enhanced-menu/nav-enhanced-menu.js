import { createElement, Component } from 'react';

import NavEnhancedMenuComponent from './nav-enhanced-menu-component';

class NavEnhancedMenuContainer extends Component {
  render() {
    return createElement(NavEnhancedMenuComponent, this.props, null);
  }
}

export default NavEnhancedMenuContainer;
