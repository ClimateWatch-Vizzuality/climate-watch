import React from 'react';
import Intro from 'components/intro';
import Section from 'components/section';
import Icon from 'components/icon';
import AutocompleteSearch from 'components/autocomplete-search';
import cx from 'classnames';
import cwLogo from 'assets/icons/cw-logo-white.svg';
import background from 'assets/headers/home.jpg';
import ArcOfAmbitionSection from './arc-of-ambition-section';
import styles from './intro-section-styles.scss';

const FEATURE_ENHANCEMENT_CHANGES =
  process.env.FEATURE_ENHANCEMENT_CHANGES === 'true';

const HomeIntroSection = () => (
  <Section
    className={cx(styles.section, styles.extraPadding, {
      [styles.background]: FEATURE_ENHANCEMENT_CHANGES
    })}
    backgroundImage={background}
    backgroundColor="linear-gradient(90deg, rgba(10,69,202,1) 45%, rgba(24,162,224,1) 100%)"
  >
    <div className={cx(styles.column, styles.homeIntro)}>
      <Icon icon={cwLogo} className={styles.cwLogo} />
      <Intro
        description="Climate Watch offers open data, visualizations and analysis to help policymakers, researchers and other stakeholders gather insights on countries' climate progress."
        className={styles.intro}
      />
      <AutocompleteSearch
        className={styles.autocompleteSearch}
        placeholder="Search across the platform by keyword or by country"
      />
      {FEATURE_ENHANCEMENT_CHANGES && <ArcOfAmbitionSection />}
    </div>
  </Section>
);

export default HomeIntroSection;
