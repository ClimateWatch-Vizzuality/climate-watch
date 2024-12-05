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

const HomeIntroSection = () => (
  <Section
    className={cx(styles.section, styles.extraPadding, styles.background)}
    backgroundImage={background}
    backgroundColor="linear-gradient(90deg, rgba(10,69,202,1) 45%, rgba(24,162,224,1) 100%)"
  >
    <div className={cx(styles.column, styles.homeIntro)}>
      <Icon icon={cwLogo} className={styles.cwLogo} />
      <Intro
        description='<p>Climate Watch offers open data, visualizations and analysis to help policymakers, researchers and other stakeholders gather insights on countries&apos; climate progress.</p><p>Countries are expected to submit new <a href="https://www.wri.org/insights/nationally-determined-contributions-ndcs-explained" rel="noopener noreferrer" target="_blank">NDCs</a> by early 2025. <a href="/ndc-tracker">Track submissions here</a> and learn about the <a href="https://www.wri.org/ndcs" rel="noopener noreferrer" target="_blank">benefits of strong new NDCs</a>.</p>'
        className={styles.intro}
        skipAbbrReplace
      />
      <AutocompleteSearch
        className={styles.autocompleteSearch}
        placeholder="Search across the platform by keyword or by country"
      />
      <ArcOfAmbitionSection />
    </div>
  </Section>
);

export default HomeIntroSection;
