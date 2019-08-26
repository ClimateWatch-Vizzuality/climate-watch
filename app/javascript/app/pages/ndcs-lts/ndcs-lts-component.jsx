import React from 'react';
import Proptypes from 'prop-types';
import Header from 'components/header';
import Intro from 'components/intro';
import AutocompleteSearch from 'components/autocomplete-search';
import { NDC_LTS } from 'data/SEO';
import { MetaDescription, SocialMetadata } from 'components/seo';

import layout from 'styles/layout.scss';
import styles from './ndcs-lts-styles.scss';

const NDCSLTS = ({ route }) => (
  <div>
    <MetaDescription descriptionContext={NDC_LTS} subtitle="NDC LTS" />
    <SocialMetadata descriptionContext={NDC_LTS} href={location.href} />
    <Header route={route}>
      <div className={layout.content}>
        <div className="grid-column-item">
          <div className={styles.headerLayout}>
            <Intro
              title="Long-term Strategy Tracker"
              description={
                '<p>Under the Paris Agreement, countries are invited to communicate long-term strategies by 2020. These strategies are a valuable opportunity for countries to lay out their vision for achieving a low-carbon economy by 2050 while also pursuing sustainable development.</p>'
              }
            />
            <AutocompleteSearch />
          </div>
        </div>
      </div>
    </Header>
    <div className={styles.wrapper}>
      <div className={layout.content}>
        {route.sections &&
          route.sections.length > 0 &&
          route.sections.map(section => (
            <div className={styles.section}>
              <div id={section.hash} className={styles.sectionHash} />
              <section.component />
            </div>
          ))}
      </div>
    </div>
  </div>
);

NDCSLTS.propTypes = {
  route: Proptypes.object.isRequired
};

export default NDCSLTS;
