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
                description="Under the Paris Agreement, countries regularly submit <a href='https://www.wri.org/insights/nationally-determined-contributions-ndcs-explained' class=${styles.link}>Nationally Determined Contributions (NDCs)</a>, their commitments to tackle climate change. Countries are expected to submit new NDCs by early 2025. Learn about <a href='https://www.wri.org/ndcs' class=${styles.link}>the many befits of strong new NDCs</a>."
              />
            </div>
            <div className={styles.searchWrapper}>
              <Button
                variant="primary"
                link="/ndc-tracker"
                className="link-button"
              >
                <AbbrReplace>Go to New NDC Tracker</AbbrReplace>
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
