import React from 'react';
import ReactPlayer from 'react-player';
import videoThumbnailImage from 'assets/home/videobg@2x';

import IntroSection from './intro-section/intro-section';
import LatestUpdatesSection from './latest-updates-section/latest-updates-section';
import CarouselSection from './carousel-section';
import UserCasesSection from './user-cases-section';
import HighlightedStories from './stories';
import SubscribeSection from './subscribe-section';

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
    <HighlightedStories />
    <SubscribeSection />
  </div>
);

export default Home;
