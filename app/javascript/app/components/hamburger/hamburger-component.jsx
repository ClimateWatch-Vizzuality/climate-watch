import React from 'react';
import PropTypes from 'prop-types';

// import Icon from 'component/icon';
// import arrow from 'assets/icons/arrow-down-tiny.svg';

import styles from './hamburger-styles.scss';

const Hamburger = ({ isOpen, openMenu, closeMenu }) => (
  <div className={styles.container}>
    {isOpen && (
      <div
        role="button"
        className={styles.button}
        onClick={() => closeMenu()}
        tabIndex="0"
      >
        isopen
        {/* <Icon icon={arrow} className={styles.arrowIcon} /> */}
      </div>
    )}
    {!isOpen && (
      <div
        role="button"
        className={styles.button}
        onClick={() => openMenu()}
        tabIndex="0"
      >
        is Closed
      </div>
    )}
  </div>
);

Hamburger.propTypes = {
  isOpen: PropTypes.bool,
  openMenu: PropTypes.func,
  closeMenu: PropTypes.func
};

export default Hamburger;
