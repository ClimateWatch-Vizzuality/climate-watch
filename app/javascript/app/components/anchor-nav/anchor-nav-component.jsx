import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import styles from './anchor-nav-styles.scss';

const AnchorNav = props => {
  const { links } = props;
  return (
    <nav className={styles.anchorNav}>
      {links.map(link =>
        (<NavLink
          exact
          key={link.label}
          className={styles.link}
          activeClassName={styles.linkActive}
          to={link.path}
        >
          {link.label}
        </NavLink>)
      )}
    </nav>
  );
};

AnchorNav.propTypes = {
  links: PropTypes.array
};

export default AnchorNav;
