import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { NavLink } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import qs from 'query-string';

import styles from './anchor-nav-styles.scss';

const AnchorNav = props => {
  const { links, useRoutes, className, query } = props;
  return (
    <nav className={cx(styles.anchorNav, className)}>
      {links.map(link => {
        const linkProps = {
          key: link.label,
          className: styles.link,
          activeClassName: styles.linkActive,
          to: {
            search: link.search || query,
            pathname: link.path,
            hash: link.hash
          }
        };
        if (link.checkActiveQuery) {
          linkProps.isActive = (match, location) =>
            qs.parse(location.search)[link.checkActiveQuery] ===
            link.activeQueryValue;
        }
        if (useRoutes) {
          linkProps.exact = true;
          return <NavLink {...linkProps}>{link.label}</NavLink>;
        }
        linkProps.isActive = (match, location) =>
          `#${link.hash}` === location.hash;
        return <HashLink {...linkProps}>{link.label}</HashLink>;
      })}
    </nav>
  );
};

AnchorNav.propTypes = {
  links: PropTypes.array,
  useRoutes: PropTypes.bool.isRequired,
  className: PropTypes.string,
  query: PropTypes.string
};

AnchorNav.defaultProps = {
  links: [],
  useRoutes: false,
  query: ''
};

export default AnchorNav;
