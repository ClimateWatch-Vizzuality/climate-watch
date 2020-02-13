import React from 'react';
import { NavLink } from 'react-router-dom';
import ShareMenu from 'components/share-menu';
import ShareButton from 'components/button/share-button';
import Icon from 'components/icon';
import downloadIcon from 'assets/icons/download.svg';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { TabletPortrait, MobileOnly } from 'components/responsive';
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
    <Icon icon={downloadIcon} className={styles.downloadIcon} />
    <span>DATA EXPLORER</span>
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
  const { className, closeMenu, location, reverse, theme } = props;
  const { pathname, search } = location;
  return (
    <div className={cx(styles.toolsNav, className, theme.toolsNav)}>
      {[
        renderMyCWLink(location, closeMenu, theme),
        renderDataExplorerLink(location, closeMenu, theme)
      ]}
      <TabletPortrait>
        <ShareMenu
          className={cx(
            styles.iconButton,
            styles.shareButton,
            theme.shareButton
          )}
          reverse={reverse}
        />
      </TabletPortrait>
      <MobileOnly>
        <ShareButton
          onClick={closeMenu}
          className={cx(styles.shareButton, theme.shareButton)}
          analyticsName="Main menu"
          sharePath={`/embed/${pathname}${search}`}
        />
      </MobileOnly>
    </div>
  );
};

ToolsNav.propTypes = {
  className: PropTypes.string,
  theme: PropTypes.object,
  reverse: PropTypes.bool,
  location: PropTypes.object,
  closeMenu: PropTypes.func
};

ToolsNav.defaultProps = {
  reverse: false,
  theme: {}
};

export default ToolsNav;
