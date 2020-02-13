import React from 'react';
import { NavLink } from 'react-router-dom';
import ShareButton from 'components/button/share-button';
import Icon from 'components/icon';
import downloadIcon from 'assets/icons/download.svg';
import cx from 'classnames';
import PropTypes from 'prop-types';
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
    <span>DATA EXPLORER</span>
    <Icon icon={downloadIcon} className={styles.downloadIcon} />
  </NavLink>
);
const renderMyCWLink = (location, onClick, theme) => (
  <NavLink
    key={'my-climate-watch'}
    className={cx(styles.link, styles.noWrap, styles.myCwButton, theme.link)}
    {...mycwLinkConfig}
    onClick={onClick}
    {...activeProps(location)}
  >
    MY CW
  </NavLink>
);
const ToolsNav = props => {
  const { className, closeMenu, location, theme } = props;
  const { pathname, search } = location;
  return (
    <div className={cx(styles.toolsNav, className, theme.toolsNav)}>
      {[
        renderMyCWLink(location, closeMenu, theme),
        renderDataExplorerLink(location, closeMenu, theme)
      ]}
      <ShareButton
        onClick={closeMenu}
        className={cx(styles.shareButton, theme.shareButton)}
        analyticsName="Main menu"
        sharePath={`/embed/${pathname}${search}`}
      />
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
