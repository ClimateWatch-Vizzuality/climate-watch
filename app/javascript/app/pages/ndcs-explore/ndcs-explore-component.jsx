/* eslint-disable max-len */
import React from 'react';
import Proptypes from 'prop-types';
import Header from 'components/header';
import Intro from 'components/intro';
import { NDCS_EXPLORE } from 'data/SEO';
import { MetaDescription, SocialMetadata } from 'components/seo';
import AutocompleteSearch from 'components/autocomplete-search';

import layout from 'styles/layout.scss';
import styles from './ndcs-explore-styles.scss';

const NDCSExplore = ({ route }) => (
  <div>
    <MetaDescription
      descriptionContext={NDCS_EXPLORE}
      subtitle="NDCS CONTENT"
    />
    <SocialMetadata descriptionContext={NDCS_EXPLORE} href={location.href} />
    <Header route={route}>
      <div className={layout.content}>
        <div className="grid-column-item">
          <div className={styles.headerLayout}>
            <Intro
              title="Explore Nationally Determined Contributions (NDCs)"
              description="Under the Paris Agreement, nearly every nation made a commitment to tackle climate change and strengthen their efforts over time. Explore the content of these nationally determined contributions (NDCs) by searching for key terms. You can analyze and compare NDCs using over 150 structured indicators."
            />
          </div>
          <div className={styles.searchWrapper}>
            <AutocompleteSearch placeholder="Search NDCs for a keyword or phrase (e.g., ‘forest’ or ‘CO2’)" />
          </div>
        </div>
      </div>
    </Header>
    <div className={styles.wrapper}>
      {route.sections &&
        route.sections.length > 0 &&
        route.sections.map(section => (
          <div key={section.label} className={styles.section}>
            <div id={section.hash} className={styles.sectionHash} />
            <section.component />
          </div>
        ))}
    </div>
  </div>
);

NDCSExplore.propTypes = {
  route: Proptypes.object.isRequired
};

export default NDCSExplore;
