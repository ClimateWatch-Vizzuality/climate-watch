import React from 'react';
import Proptypes from 'prop-types';
import Header from 'components/header';
import Intro from 'components/intro';
import BackButton from 'components/back-button';
import AutocompleteSearch from 'components/autocomplete-search';
import { SEO_PAGES } from 'data/seo';
import SEOTags from 'components/seo-tags';

import layout from 'styles/layout.scss';
import styles from './ndcs-enhancements-styles.scss';

const NDCSEnhancements = ({ route }) => (
  <div>
    <SEOTags page={SEO_PAGES.ndc2020} href={location.href} />
    <Header route={route}>
      <div className={layout.content}>
        <div className="grid-column-item">
          <div className={styles.headerLayout}>
            <BackButton pathname="/ndcs-explore" backLabel="Explore NDCs" />
            <Intro
              title="NDC Enhancement Tracker"
              description={
                '<p>The Paris Agreement calls on countries to deliver new Nationally Determined Contributions (NDCs) every five years. The last round of Nationally Determined Contributions (NDCs) were submitted in 2020-2021.  Explore the content of current NDCs from this 2020-2021 submission round with over 150 structured indicators to analyze and compare as seen below.</p><p>The next batch of NDCs, expected to be more ambitious, is slated for submission in 2025 before COP30. Stay tuned for Climate Watch’s new 2025 NDCs Tracker, set to launch later this year.</p></Intro>'
              }
            />
            <span data-tour="ndc-enhancement-tracker-01">
              <AutocompleteSearch />
            </span>
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

NDCSEnhancements.propTypes = {
  route: Proptypes.object.isRequired
};

export default NDCSEnhancements;
