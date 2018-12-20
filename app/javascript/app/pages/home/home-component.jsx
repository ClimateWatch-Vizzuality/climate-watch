import React from 'react';
import Intro from 'components/intro';
import Section from 'components/section';
import Icon from 'components/icon';
import AutocompleteSearch from 'components/autocomplete-search';
import cx from 'classnames';
import cwLogo from 'assets/icons/cw-logo-white.svg';
import background from 'assets/headers/home.jpg';
import SiteMapFooter from 'components/site-map-footer';

import CarouselSection from './carousel-section';
import UserCasesSection from './user-cases-section';

import styles from './home-styles.scss';

const Home = () => (
  <div className={styles.homeBg}>
    <Section
      className={cx(styles.section, styles.extraPadding)}
      backgroundImage={background}
    >
      <div className={cx(styles.column, styles.homeIntro)}>
        <Icon icon={cwLogo} className={styles.cwLogo} />
        <Intro
          description="Improving understanding of the possible policy and development paths that could lead to decarbonization of the economy in different countries by providing high-quality, global data."
          className={styles.intro}
        />
        <AutocompleteSearch
          className={styles.autocompleteSearch}
          placeholder="Search across the platform by keyword or by country"
        />
      </div>
    </Section>
    <div>
      <CarouselSection />
    </div>
    <div>
      <UserCasesSection />
    </div>
    <SiteMapFooter />
  </div>
);

export default Home;
