import React from 'react';
import { NavLink } from 'react-router-dom';
import cx from 'classnames';
import PropTypes from 'prop-types';
import styles from './side-navigation-styles.scss';

const SideNavigationComponent = ({ sections, selectedSection }) => (
  <div className={styles.sideNavigation}>
    {sections.map(section => (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <NavLink
        to={section.slug}
        key={section.slug}
        className={cx(styles.sectionLabel, {
          [styles.selected]: section.slug === selectedSection
        })}
      >
        {section.label}
      </NavLink>
    ))}
  </div>
);

SideNavigationComponent.propTypes = {
  sections: PropTypes.array,
  selectedSection: PropTypes.object
};

export default SideNavigationComponent;
