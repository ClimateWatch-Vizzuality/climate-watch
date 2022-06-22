import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { themr } from 'react-css-themr';
import { NavLink } from 'react-router-dom';
import { NavHashLink } from 'react-router-hash-link';
import AbbrReplace from 'components/abbr-replace';
import qs from 'query-string';

import styles from './anchor-nav-styles.scss';

const AnchorNav = props => {
  const {
    links,
    useRoutes,
    className,
    query,
    theme,
    offset,
    activeSection,
    dataTour,
    dataTours
  } = props;
  return (
    <div className={cx(styles.anchorContainer)}>
      <nav className={cx(className, theme.anchorNav)} data-tour={dataTour}>
        <ul>
          {links &&
            links.map((link, index) => {
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
                    <li>
                      {activeSearchQuery === linkSearchQuery ||
                        (index === 0 && !activeSearchQuery)}
                    </li>
                  );
                };
              }
              if (useRoutes) {
                linkProps.exact = true;
                return (
                  <li>
                    <span
                      data-tour={
                        dataTours && dataTours[link.label.toLowerCase()]
                      }
                    >
                      <NavLink {...linkProps} replace>
                        <AbbrReplace>{link.label}</AbbrReplace>
                      </NavLink>
                    </span>
                  </li>
                );
              }
              linkProps.isActive = (match, location) =>
                link.hash === activeSection ||
                (link.defaultActiveHash &&
                  (`#${link.hash}` === location.hash ||
                    (!location.hash && index === 0)));
              return (
                <li>
                  <NavHashLink
                    {...linkProps}
                    smooth
                    scroll={el => {
                      el.scrollIntoView(true);
                      if (offset) window.scrollBy(0, offset[index]);
                    }}
                    replace
                  >
                    <AbbrReplace>{link.label}</AbbrReplace>
                  </NavHashLink>
                </li>
              );
            })}
        </ul>
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
  activeSection: PropTypes.string,
  offset: PropTypes.array,
  dataTour: PropTypes.string,
  dataTours: PropTypes.object
};

AnchorNav.defaultProps = {
  links: [],
  useRoutes: false,
  query: ''
};

export default themr('AnchorNav', styles)(AnchorNav);
