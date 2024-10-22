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
              description="The Paris Agreement requires countries to submit new Nationally Determined Contributions (NDCs) every five years, reflecting progressively higher ambition and taking into account each country’s capacity. The new round of NDCs, due in early 2025, will outline countries’ climate actions through 2035 and take into account the Global Stocktake. To learn more, please visit WRI’s page on <a href='https://www.wri.org/ndcs' target='_blank' rel='noopener noreferrer'>Next Generation NDCs.</a>"
              skipAbbrReplace
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
