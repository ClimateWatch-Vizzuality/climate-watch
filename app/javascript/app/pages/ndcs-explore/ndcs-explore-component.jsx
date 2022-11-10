/* eslint-disable max-len */
import React from 'react';
import Proptypes from 'prop-types';
import Header from 'components/header';
import Button from 'components/button';
import Intro from 'components/intro';
import AbbrReplace from 'components/abbr-replace';
import AutocompleteSearch from 'components/autocomplete-search';
import ModalMetadata from 'components/modal-metadata';
import ModalShare from 'components/modal-share';
import { isPageContained } from 'utils/navigation';
import RegionsProvider from 'providers/regions-provider/regions-provider';
import CountriesProvider from 'providers/countries-provider/countries-provider';

import layout from 'styles/layout.scss';
import styles from './ndcs-explore-styles.scss';

const NDCSExplore = ({ route }) => (
  <div>
    {!isPageContained && (
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
                <AbbrReplace>Go to NDC Enhancement Tracker</AbbrReplace>
              </Button>
              <span data-tour="ndc-explore-01">
                <AutocompleteSearch
                  placeholder={
                    'Search NDCs for a keyword or phrase (e.g., ‘forest’ or ‘CO2’)'
                  }
                />
              </span>
            </div>
          </div>
        </div>
      </Header>
    )}
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
    <CountriesProvider />
    <RegionsProvider />
  </div>
);

NDCSExplore.propTypes = {
  route: Proptypes.object.isRequired
};

export default NDCSExplore;
