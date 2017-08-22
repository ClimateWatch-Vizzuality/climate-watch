import React from 'react';
import Intro from 'components/intro';
import Section from 'components/section';
import Search from 'components/search';
import Icon from 'components/icon';

import cwLogo from 'assets/icons/cw-logo-white.svg';
import homeOneBg from 'assets/backgrounds/home_bg_1';
import homeOneImage from 'assets/backgrounds/home_image_1';
import homeTwoBg from 'assets/backgrounds/home_bg_2';
import homeTwoImage from 'assets/backgrounds/home_image_2';
import homeThreeBg from 'assets/backgrounds/home_bg_3';
import homeThreeImage from 'assets/backgrounds/home_image_3';

import styles from './home-styles.scss';

const Home = () =>
  (<div>
    <Section className={styles.homeOne} backgroundImage={homeOneBg}>
      <div className={styles.column}>
        <Icon icon={cwLogo} className={styles.cwLogo} theme={styles} />
        <Intro description="Improving understanding of the possible policy and development paths that could lead to decarbonization of the economy in different countries by providing high-quality, global data." />
        <Search />
      </div>
      <div className={styles.column}>
        <img src={homeOneImage} alt="home-section-one" />
      </div>
    </Section>
    <Section className={styles.homeTwo} backgroundImage={homeTwoBg}>
      <div className={styles.column}>
        <img src={homeTwoImage} alt="home-section-two" />
      </div>
      <div className={styles.column}>
        <Intro
          className={styles.lightIntro}
          theme={styles}
          title="Explore the country factsheets"
          description="Check each country or region’s progress on climate action lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        />
      </div>
    </Section>
    <Section className={styles.homeThree} backgroundImage={homeThreeBg}>
      <div className={styles.column}>
        <Intro
          className={styles.lightIntro}
          theme={styles}
          title="See and compare the Nationally Determined Contributions"
          description="Check each country or region’s progress on climate action lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        />
      </div>
      <div className={styles.column}>
        <img src={homeThreeImage} alt="home-section-one" />
      </div>
    </Section>
  </div>);

export default Home;
