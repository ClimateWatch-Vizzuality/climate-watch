import React from 'react';
import ReactPlayer from 'react-player';
import videoThumbnailImage from 'assets/home/videobg@2x';
import SEOTags from 'components/seo-tags';
import { SEO_PAGES } from 'data/seo';

import IntroSection from './intro-section/intro-section';
import LatestUpdatesSection from './latest-updates-section/latest-updates-section';
import CarouselSection from './carousel-section';
import UserCasesSection from './user-cases-section';
import HighlightedStories from './stories';
import SubscribeSection from './subscribe-section';

import styles from './home-styles.scss';

const Home = () => (
  <div className={styles.homeBg}>
    <SEOTags href={location.href} page={SEO_PAGES.home} />
    <IntroSection />
    <div data-tour="step-02">
      <LatestUpdatesSection />
    </div>
    <div>
      <CarouselSection />
    </div>
    <div>
      <UserCasesSection />
    </div>
    <div className={styles.video} data-tour="step-01">
      <ReactPlayer
        width="100%"
        height="100%"
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
