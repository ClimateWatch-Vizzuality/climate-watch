import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { themr } from 'react-css-themr';
import { NavLink } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import qs from 'query-string';

import layout from 'styles/layout.scss';
import styles from './anchor-nav-styles.scss';

const AnchorNav = props => {
  const { links, useRoutes, className, query, theme, gradientColor } = props;
  const gradientStyle = gradientColor
    ? {
      background: `radial-gradient(40px 30px ellipse at 0%, ${gradientColor}, transparent), radial-gradient(50px 30px ellipse at 100%, ${gradientColor}, transparent)`
    }
    : null;

  return (
    <div className={cx(layout.content, styles.anchorContainer)}>
      {gradientStyle && (
        <span className={styles.gradient} style={gradientStyle} />
      )}
      <nav className={cx(className, theme.anchorNav)}>
        {links.map((link, index) => {
          const linkProps = {
            key: link.label,
            className: theme.link,
            activeClassName: theme.linkActive,
            to: {
              search: link.search || query,
              pathname: link.path,
              hash: link.hash
            }
          };
          if (link.activeQuery) {
            linkProps.isActive = (match, location) => {
              const activeSearchQuery = qs.parse(location.search)[
                link.activeQuery.key
              ];
              const linkSearchQuery = link.activeQuery.value;
              return (
                activeSearchQuery === linkSearchQuery ||
                (index === 0 && !activeSearchQuery)
              );
            };
          }
          if (useRoutes) {
            linkProps.exact = true;
            return (
              <NavLink {...linkProps} replace>
                {link.label}
              </NavLink>
            );
          }
          linkProps.isActive = (match, location) =>
            `#${link.hash}` === location.hash;
          return (
            <HashLink {...linkProps} replace>
              {link.label}
            </HashLink>
          );
        })}
      </nav>
    </div>
  );
};

AnchorNav.propTypes = {
  links: PropTypes.array,
  useRoutes: PropTypes.bool.isRequired,
  className: PropTypes.string,
  query: PropTypes.string,
  theme: PropTypes.object,
  gradientColor: PropTypes.string
};

AnchorNav.defaultProps = {
  links: [],
  useRoutes: false,
  query: ''
};

export default themr('AnchorNav', styles)(AnchorNav);
