import React from 'react';
import PropTypes from 'prop-types';

import Icon from 'components/icon';
import arrow from 'assets/icons/arrow-down-tiny.svg';

const NavEnhancedMenuComponent = ({ ...props }) => (
  <div>
    <div>
      <span>{props.title}</span>
      <Icon icon={arrow} />
    </div>
    {props.isOpen && <props.childComponent />}
  </div>
);

NavEnhancedMenuComponent.propTypes = {
  title: PropTypes.string,
  isOpen: PropTypes.bool,
  childComponent: PropTypes.func
};

export default NavEnhancedMenuComponent;

// onClick={props.isOpen ? closeMenu() : openMenu()}
