import React from 'react';
import { LineChart, Line, XAxis, Tooltip } from 'recharts';
import Intro from 'components/intro';
import Section from 'components/section';
import Search from 'components/search';
import Icon from 'components/icon';

import cwLogo from 'assets/icons/cw-logo.svg';
import homeOneBg from 'assets/backgrounds/home_bg_1';
import homeOneImage from 'assets/backgrounds/home_image_1';
import homeTwoBg from 'assets/backgrounds/home_bg_2';
import homeTwoImage from 'assets/backgrounds/home_image_2';
import homeThreeBg from 'assets/backgrounds/home_bg_3';
import homeThreeImage from 'assets/backgrounds/home_image_3';

import styles from './home-styles.scss';

const data = [
  { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 }
];

const animated = false;

const renderTooltip = props =>
  console.info(props) ||
  <div>
    {props.label}
  </div>;

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
    <LineChart width={400} height={400} data={data}>
      <Tooltip
        isAnimationActive={animated}
        cursor={false}
        content={renderTooltip}
      />
      <Line
        isAnimationActive={animated}
        onClick={e => console.info(e)}
        type="monotone"
        dataKey="uv"
        stroke="#8884d8"
      />
      <XAxis isAnimationActive={animated} dataKey="uv" />
    </LineChart>
  </div>);
export default Home;
