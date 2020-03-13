import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Icon from 'components/icon';
import cx from 'classnames';
import arrow from 'assets/icons/arrow-down-tiny.svg';
import styles from './nav-with-child-menu-styles.scss';

const NavWithChildMenu = ({
  title,
  options,
  closeMenu,
  theme,
  activeClassName
}) => (
  <div className={cx(styles.container, theme.navWithChildContainer)}>
    <div className={cx(styles.title, theme.title)}>{title}:</div>
    {options.map(option => (
      <NavLink
        key={option.label}
        to={option.path}
        onClick={closeMenu}
        className={cx(styles.link, theme.link)}
        activeClassName={activeClassName || styles.active}
      >
        {option.label.toUpperCase()}
        <Icon icon={arrow} className={cx(styles.arrowIcon, theme.arrowIcon)} />
      </NavLink>
    ))}
  </div>
);

NavWithChildMenu.propTypes = {
  options: PropTypes.array.isRequired,
  title: PropTypes.string,
  closeMenu: PropTypes.func,
  theme: PropTypes.object,
  activeClassName: PropTypes.string
};

NavWithChildMenu.defaultProps = {
  theme: {}
};

export default NavWithChildMenu;
