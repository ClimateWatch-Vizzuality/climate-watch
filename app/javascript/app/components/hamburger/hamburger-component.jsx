import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Icon from 'components/icon';
import close from 'assets/icons/sidebar-close.svg';
import hamburger from 'assets/icons/hamburger.svg';

import styles from './hamburger-styles.scss';

const Hamburger = ({ isOpen, openMenu, closeMenu, className }) => (
  <div className={cx(styles.container, className)}>
    <button onClick={isOpen ? closeMenu : openMenu} className={styles.button}>
      <Icon icon={isOpen ? close : hamburger} className={styles.icon} />
    </button>
  </div>
);

Hamburger.propTypes = {
  isOpen: PropTypes.bool,
  openMenu: PropTypes.func,
  closeMenu: PropTypes.func,
  className: PropTypes.string
};

export default Hamburger;
