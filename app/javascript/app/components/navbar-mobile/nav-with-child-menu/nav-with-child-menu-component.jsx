import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import styles from './nav-with-child-menu-styles.scss';

const NavWithChildMenu = ({ title, options, closeMenu }) => (
  <div className={styles.container}>
    <div className={styles.title}>{title}</div>
    {options.map(option => (
      <NavLink
        key={option.label}
        to={option.path}
        onClick={closeMenu}
        className={styles.link}
        activeClassName={styles.active}
      >
        {option.label.toUpperCase()}
      </NavLink>
    ))}
  </div>
);

NavWithChildMenu.propTypes = {
  options: PropTypes.array.isRequired,
  title: PropTypes.string,
  closeMenu: PropTypes.func
};

export default NavWithChildMenu;
