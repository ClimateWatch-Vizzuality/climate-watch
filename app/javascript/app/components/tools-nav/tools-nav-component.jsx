import React from 'react';
import { NavLink } from 'react-router-dom';
import Icon from 'components/icon';
import downloadIcon from 'assets/icons/download.svg';
import cx from 'classnames';
import PropTypes from 'prop-types';
import arrow from 'assets/icons/arrow-down-tiny.svg';
import styles from './tools-nav-styles.scss';

const mycwLinkConfig = { to: '/my-climate-watch', title: 'My climate watch' };
const isActive = (match, location) =>
  match && location.pathname.includes(match.path);
const activeProps = location => ({
  isActive: match => isActive(match, location),
  activeClassName: styles.linkActive
});
const renderDataExplorerLink = (location, onClick, theme) => (
  <NavLink
    key={'data-explorer'}
    className={cx(
      styles.link,
      styles.noWrap,
      styles.linkWithIcon,
      theme.link,
      theme.linkWithIcon
    )}
    to="/data-explorer"
    title="Data Explorer"
    onClick={onClick}
    {...activeProps(location)}
  >
    <span className={styles.titleWrapper}>
      <span className={cx(styles.title, theme.title)}>Data explorer</span>
      <Icon
        icon={downloadIcon}
        className={cx(styles.downloadIcon, theme.downloadIcon)}
      />
    </span>
    <Icon icon={arrow} className={cx(styles.arrowIcon, theme.arrowIcon)} />
  </NavLink>
);
const renderMyCWLink = (location, onClick, theme) => (
  <NavLink
    key={'my-climate-watch'}
    className={cx(
      styles.link,
      styles.noWrap,
      styles.myCwButton,
      theme.link,
      theme.myCwButton
    )}
    {...mycwLinkConfig}
    onClick={onClick}
    {...activeProps(location)}
  >
    <span className={cx(styles.title, theme.title)}>My CW</span>
    <Icon icon={arrow} className={cx(styles.arrowIcon, theme.arrowIcon)} />
  </NavLink>
);
const ToolsNav = props => {
  const { className, closeMenu, location, theme } = props;
  return (
    <div className={cx(styles.toolsNav, className, theme.toolsNav)}>
      {[
        renderMyCWLink(location, closeMenu, theme),
        renderDataExplorerLink(location, closeMenu, theme)
      ]}
    </div>
  );
};

ToolsNav.propTypes = {
  className: PropTypes.string,
  theme: PropTypes.object,
  location: PropTypes.object,
  closeMenu: PropTypes.func
};

ToolsNav.defaultProps = {
  reverse: false,
  theme: {}
};

export default ToolsNav;
