import React from 'react';
<<<<<<< HEAD
import ReactPlayer from 'react-player';
import Intro from 'components/intro';
import Section from 'components/section';
import Icon from 'components/icon';
import AutocompleteSearch from 'components/autocomplete-search';
import cx from 'classnames';
import cwLogo from 'assets/icons/cw-logo-white.svg';
import background from 'assets/headers/home.jpg';
import videoThumbnailImage from 'assets/home/video_background';
import SiteMapFooter from 'components/site-map-footer';

import HighlightedStories from './stories';
=======
import IntroSection from './intro-section/intro-section';
import LatestUpdatesSection from './latest-updates-section/latest-updates-section';
>>>>>>> Integrate Latest updates section with api
import CarouselSection from './carousel-section';
import UserCasesSection from './user-cases-section';

import styles from './home-styles.scss';

const Home = () => (
  <div className={styles.homeBg}>
    <IntroSection />
    <div>
      <LatestUpdatesSection />
    </div>
    <div>
      <CarouselSection />
    </div>
    <div>
      <UserCasesSection />
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
    <SiteMapFooter />
  </div>
);

export default Home;
