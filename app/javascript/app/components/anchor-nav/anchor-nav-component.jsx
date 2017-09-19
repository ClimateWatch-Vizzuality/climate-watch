import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { NavLink } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

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
            search: query,
            pathname: link.path
          }
        };
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
  query: PropTypes.string,
  links: PropTypes.array,
  useRoutes: PropTypes.bool.isRequired,
  className: PropTypes.string
};

AnchorNav.defaultProps = {
  links: [],
  useRoutes: false
};

export default AnchorNav;
