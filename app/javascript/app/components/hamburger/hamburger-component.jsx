import React from 'react';
import PropTypes from 'prop-types';

import Icon from 'components/icon';
import close from 'assets/icons/sidebar-close.svg';
import hamburger from 'assets/icons/hamburger.svg';

import styles from './hamburger-styles.scss';

const Hamburger = ({ isOpen, openMenu, closeMenu, text }) => (
  <div className={styles.container}>
    <p className={styles.text}>{text}</p>
    {isOpen && (
      <div role="button" onClick={() => closeMenu()} tabIndex="0">
        <Icon icon={close} className={styles.button} />
      </div>
    )}
    {!isOpen && (
      <div role="button" onClick={() => openMenu()} tabIndex="0">
        <Icon icon={hamburger} className={styles.button} />
      </div>
    )}
  </div>
);

Hamburger.propTypes = {
  isOpen: PropTypes.bool,
  openMenu: PropTypes.func,
  closeMenu: PropTypes.func,
  text: PropTypes.string
};

export default Hamburger;
