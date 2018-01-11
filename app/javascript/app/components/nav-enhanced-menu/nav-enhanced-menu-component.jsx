import React from 'react';
import PropTypes from 'prop-types';

import Icon from 'components/icon';
import arrow from 'assets/icons/arrow-down-tiny.svg';

const NavEnhancedMenuComponent = ({ ...props }) => (
  <div>
    <button onClick={props.isOpen ? props.closeMenu : props.openMenu}>
      <span>{props.title}</span>
      <Icon icon={arrow} />
    </button>
    {props.isOpen && <props.childComponent />}
  </div>
);

NavEnhancedMenuComponent.propTypes = {
  title: PropTypes.string,
  childComponent: PropTypes.func,
  isOpen: PropTypes.bool,
  openMenu: PropTypes.func,
  closeMenu: PropTypes.func
};

export default NavEnhancedMenuComponent;
