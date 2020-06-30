/* eslint-disable max-len */
import React from 'react';
import Proptypes from 'prop-types';
import Header from 'components/header';
import Button from 'components/button';
import Intro from 'components/intro';
import { NDCS_EXPLORE } from 'data/SEO';
import { MetaDescription, SocialMetadata } from 'components/seo';
import AutocompleteSearch from 'components/autocomplete-search';
import ModalMetadata from 'components/modal-metadata';
import ModalShare from 'components/modal-share';

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
              description="Under the Paris Agreement, nearly every nation made a commitment to tackle climate change and strengthen their efforts over time. Explore the content of these Nationally Determined Contributions (NDCs) by searching for key terms. You can analyze and compare NDCs using over 150 structured indicators."
            />
          </div>
          <div className={styles.searchWrapper}>
            <Button
              variant="primary"
              link="/2020-ndc-tracker"
              className="link-button"
            >
              Go to 2020 NDC Tracker
            </Button>
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
    <ModalMetadata />
    <ModalShare analyticsName="NDC Explore" />
  </div>
);

NDCSExplore.propTypes = {
  route: Proptypes.object.isRequired
};

export default NDCSExplore;
