/* eslint-disable max-len */
import React from 'react';
import Proptypes from 'prop-types';
import Header from 'components/header';
import Intro from 'components/intro';
import { SEO_PAGES } from 'data/seo';
import SEOTags from 'components/seo-tags';
import RegionsProvider from 'providers/regions-provider/regions-provider';
import CountriesProvider from 'providers/countries-provider/countries-provider';

import layout from 'styles/layout.scss';
import styles from './lts-explore-styles.scss';

const LTSExplore = ({ route }) => (
  <div>
    <SEOTags page={SEO_PAGES.ltsExplore} href={location.href} />
    <Header route={route}>
      <div className={layout.content}>
        <div className="grid-column-item">
          <div className={styles.headerLayout}>
            <Intro
              title="Explore Long-Term Strategies (LTS)"
              description="Under the Paris Agreement, countries are invited to communicate “mid-century long-term low greenhouse gas emissions development strategies” (long-term strategies, or LTS). These strategies are central to the goal of limiting global warming to well below 2°C and to pursue efforts to limit the increase to 1.5°C, representing a significant opportunity for countries to lay out their vision for achieving a low-carbon economy by 2050 while also pursuing sustainable development. It is advantageous for countries to align their NDCs and long-term strategies for consistency and to avoid the lock-in of carbon-intensive behavior, technologies and policies."
            />
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
    <CountriesProvider />
    <RegionsProvider />
  </div>
);

LTSExplore.propTypes = {
  route: Proptypes.object.isRequired
};

export default LTSExplore;
