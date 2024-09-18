import React from 'react';
import Proptypes from 'prop-types';
import Header from 'components/header';
import BackButton from 'components/back-button';
import { SEO_PAGES } from 'data/seo';
import SEOTags from 'components/seo-tags';

import layout from 'styles/layout.scss';
import styles from './ndcs-enhancements-2025-styles.scss';

const NDCSEnhancements2025 = ({ route }) => (
  <div>
    <SEOTags page={SEO_PAGES.ndc2025} href={location.href} />
    <Header route={route}>
      <div className={layout.content}>
        <div className="grid-column-item">
          <div className={styles.headerLayout}>
            <BackButton pathname="/ndcs-explore" backLabel="Explore NDCs" />
          </div>
        </div>
      </div>
    </Header>
    <div className={styles.wrapper}>
      <div className={layout.content}>
        {route.sections &&
          route.sections.length > 0 &&
          route.sections.map(section => (
            <div key={section.hash} className={styles.section}>
              <div id={section.hash} className={styles.sectionHash} />
              <section.component />
            </div>
          ))}
      </div>
    </div>
  </div>
);

NDCSEnhancements2025.propTypes = {
  route: Proptypes.object.isRequired
};

export default NDCSEnhancements2025;
