import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { themr } from 'react-css-themr';
import { NavLink } from 'react-router-dom';
import { NavHashLink } from 'react-router-hash-link';
import qs from 'query-string';

import { hexToRgba } from 'utils/utils';
import styles from './anchor-nav-styles.scss';

const AnchorNav = props => {
  const {
    links,
    useRoutes,
    className,
    query,
    theme,
    gradientColor,
    offset,
    activeSection
  } = props;
  const gradientStyle = gradientColor
    ? {
      background: `radial-gradient(40px 30px ellipse at 0%, ${gradientColor}, ${hexToRgba(
        gradientColor,
        0
      )}), radial-gradient(50px 30px ellipse at 100%, ${gradientColor}, ${hexToRgba(
        gradientColor,
        0
      )})`
    }
    : null;
  return (
    <div>
      {gradientStyle && (
        <span className={styles.gradient} style={gradientStyle} />
      )}
      <div className={cx(styles.anchorContainer)}>
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
              link.hash === activeSection ||
              (link.defaultActiveHash &&
                (`#${link.hash}` === location.hash ||
                  (!location.hash && index === 0)));
            return (
              <NavHashLink
                {...linkProps}
                smooth
                scroll={el => {
                  el.scrollIntoView(true);
                  if (offset) window.scrollBy(0, offset[index]);
                }}
                replace
              >
                {link.label}
              </NavHashLink>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

AnchorNav.propTypes = {
  links: PropTypes.array,
  useRoutes: PropTypes.bool.isRequired,
  className: PropTypes.string,
  query: PropTypes.string,
  theme: PropTypes.object,
  gradientColor: PropTypes.string,
  activeSection: PropTypes.string,
  offset: PropTypes.array
};

AnchorNav.defaultProps = {
  links: [],
  useRoutes: false,
  query: ''
};

export default themr('AnchorNav', styles)(AnchorNav);
