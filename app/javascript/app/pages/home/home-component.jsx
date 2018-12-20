import React from 'react';
import ReactPlayer from 'react-player';
import Intro from 'components/intro';
import Section from 'components/section';
import Icon from 'components/icon';
import AutocompleteSearch from 'components/autocomplete-search';
import cx from 'classnames';
import cwLogo from 'assets/icons/cw-logo-white.svg';
import background from 'assets/headers/home.jpg';
import videoThumbnailImage from 'assets/home/video_background';

import HighlightedStories from './stories';
import CarouselSection from './carousel-section';

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
    <div className={styles.video}>
      <ReactPlayer
        width="100%"
        height="100%"
        ref={player => {
          this.player = player;
        }}
        url="https://youtu.be/C2nIcBqrHsk"
        controls={false}
        light={videoThumbnailImage}
        loop
        playing
        config={{
          youtube: {
            playerVars: {
              playsinline: 0,
              fs: 0 // remove full screen button
            },
            preload: true
          }
        }}
      />
    </div>
    <div>
      <HighlightedStories />
    </div>
  </div>
);

export default Home;
