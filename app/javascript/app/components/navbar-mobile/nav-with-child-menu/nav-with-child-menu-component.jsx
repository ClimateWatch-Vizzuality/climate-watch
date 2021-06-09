import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Icon from 'components/icon';
import cx from 'classnames';
import arrow from 'assets/icons/arrow-down-tiny.svg';
import externalLink from 'assets/icons/external-link.svg';
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
    {/* eslint-disable-next-line no-confusing-arrow */}
    {options.map(option =>
      option.external ? (
        <a
          key={option.label}
          title={option.label}
          href={option.link}
          target={option.target || '_blank'}
          className={cx(styles.link, theme.link)}
        >
          {option.label.toUpperCase()}
          <Icon
            icon={externalLink}
            className={cx(styles.externalLinkIcon, theme.externalLinkIcon)}
          />
        </a>
      ) : (
        <NavLink
          key={option.label}
          to={option.path}
          onClick={closeMenu}
          className={cx(styles.link, theme.link)}
          activeClassName={activeClassName || styles.active}
        >
          {option.label.toUpperCase()}
          <Icon
            icon={arrow}
            className={cx(styles.arrowIcon, theme.arrowIcon)}
          />
        </NavLink>
      )
    )}
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
