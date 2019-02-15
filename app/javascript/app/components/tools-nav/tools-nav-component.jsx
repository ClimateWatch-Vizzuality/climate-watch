import React from 'react';
import { NavLink } from 'react-router-dom';
import ShareMenu from 'components/share-menu';
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
const renderDataExplorerLink = location => (
  <NavLink
    className={cx(styles.link, styles.noWrap, styles.linkWithIcon)}
    to="/data-explorer"
    title="Data Explorer"
    {...activeProps(location)}
  >
    <Icon icon={downloadIcon} className={styles.downloadIcon} />
    <span>DATA EXPLORER</span>
  </NavLink>
);
const renderMyCWLink = location => (
  <NavLink
    className={cx(styles.link, styles.noWrap, styles.myCwButton)}
    {...mycwLinkConfig}
    {...activeProps(location)}
  >
    MY CW
  </NavLink>
);
const ToolsNav = props => (
  <div className={cx(styles.toolsNav, props.className)}>
    {[renderMyCWLink(props.location), renderDataExplorerLink(props.location)]}
    <ShareMenu
      className={cx(styles.iconButton, styles.shareButton)}
      reverse={props.reverse}
    />
  </div>
);

ToolsNav.propTypes = {
  className: PropTypes.string,
  reverse: PropTypes.bool,
  location: PropTypes.object
};

ToolsNav.defaultProps = {
  reverse: false
};

export default ToolsNav;
