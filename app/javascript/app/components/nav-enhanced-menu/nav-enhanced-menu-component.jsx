import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Icon from 'components/icon';
import arrow from 'assets/icons/arrow-down-tiny.svg';

import styles from './nav-enhanced-menu-styles';

const NavNestedMenuComponent = ({ className, ...props }) => (
  <div>
    <button
      onClick={props.isOpen ? props.closeMenu : props.openMenu}
      className={cx(className, styles.button, {
        [styles.active]: props.isOpen
      })}
    >
      <span>{props.title}</span>
      <Icon icon={arrow} className={styles.arrowIcon} />
    </button>
    {props.isOpen && (
      <props.Child className={styles.navNestedMenu} onBlur={props.closeMenu} />
    )}
  </div>
);

NavNestedMenuComponent.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  isOpen: PropTypes.bool,
  openMenu: PropTypes.func,
  closeMenu: PropTypes.func,
  className: PropTypes.string
};

export default NavNestedMenuComponent;
