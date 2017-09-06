import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

import styles from './anchor-nav-styles.scss';

const AnchorNav = props => {
  const { links, useRoutes } = props;
  return (
    <nav className={styles.anchorNav}>
      {links.map(link => {
        const linkProps = {
          key: link.label,
          className: styles.link,
          activeClassName: styles.linkActive,
          to: link.path
        };
        if (useRoutes) {
          linkProps.exact = true;
          linkProps.activeClassName = styles.linkActive;
          return (
            <NavLink {...linkProps}>
              {link.label}
            </NavLink>
          );
        }
        linkProps.isActive = (match, location) =>
          `#${link.hash}` === location.hash;
        return (
          <HashLink {...linkProps}>
            {link.label}
          </HashLink>
        );
      })}
    </nav>
  );
};

AnchorNav.propTypes = {
  links: PropTypes.array,
  useRoutes: PropTypes.bool.isRequired
};

AnchorNav.defaultProps = {
  links: [],
  useRoutes: false
};

export default AnchorNav;
