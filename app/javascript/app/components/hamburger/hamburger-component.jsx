import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Icon from 'components/icon';
import close from 'assets/icons/sidebar-close.svg';
import hamburger from 'assets/icons/hamburger.svg';

import styles from './hamburger-styles.scss';

const Hamburger = ({ isOpen, openMenu, closeMenu, text, className }) => (
  <div className={styles.container}>
    <p className={cx(styles.text, className)}>{text}</p>
    {isOpen && (
      <button onClick={closeMenu} className={styles.button}>
        <Icon icon={close} className={cx(styles.icon, className)} />
      </button>
    )}
    {!isOpen && (
      <div
        role="button"
        onClick={() => openMenu()}
        tabIndex="0"
        className={styles.button}
      >
        <Icon icon={hamburger} className={cx(styles.icon, className)} />
      </div>
    )}
  </div>
);

Hamburger.propTypes = {
  isOpen: PropTypes.bool,
  openMenu: PropTypes.func,
  closeMenu: PropTypes.func,
  text: PropTypes.string,
  className: PropTypes.string
};

export default Hamburger;
