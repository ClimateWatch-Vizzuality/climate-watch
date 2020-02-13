import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import cx from 'classnames';
import styles from './nav-with-child-menu-styles.scss';

const NavWithChildMenu = ({ title, options, closeMenu, theme }) => (
  <div className={cx(styles.container, theme.navWithChildContainer)}>
    <div className={cx(styles.title, theme.title)}>{title}</div>
    {options.map(option => (
      <NavLink
        key={option.label}
        to={option.path}
        onClick={closeMenu}
        className={cx(styles.link, theme.link)}
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
  closeMenu: PropTypes.func,
  theme: PropTypes.obje
};

NavWithChildMenu.defaultProps = {
  theme: {}
};

export default NavWithChildMenu;
