import React from 'react';
import Proptypes from 'prop-types';
import Header from 'components/header';
import Intro from 'components/intro';
import BackButton from 'components/back-button';
import { SEO_PAGES } from 'data/seo';
import SEOTags from 'components/seo-tags';

import Ndc2025Timeline from 'components/ndcs/ndc-2025-timeline/ndc-2025-timeline';
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
            <Intro
              title="NDC Tracker"
              description={
                // eslint-disable-next-line max-len
                '<p>The Paris Agreement calls on countries to deliver new Nationally Determined Contributions (NDCs) every five years that are informed by the latest advances in technology, science and shifting economic trends.</p>'
              }
            />
            <Ndc2025Timeline />
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
