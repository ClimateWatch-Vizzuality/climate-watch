import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Intro from 'components/intro';
import Section from 'components/section';
import Search from 'components/search';
import Icon from 'components/icon';
import Button from 'components/button';
import Dropdown from 'components/dropdown';
import ReactPlayer from 'react-player';
import cx from 'classnames';

import cwLogo from 'assets/icons/cw-logo-white.svg';
import fullscreen from 'assets/icons/map-fullscreen.svg';
import homeOneBg from 'assets/backgrounds/home_bg_1';
import homeTwoBg from 'assets/backgrounds/home_bg_2';
import homeTwoImage from 'assets/backgrounds/home_image_2';
import homeThreeBg from 'assets/backgrounds/home_bg_3';
import homeThreeImage from 'assets/backgrounds/home_image_3';

import introTheme from 'styles/themes/intro-light.scss';
import styles from './home-styles.scss';

class Home extends PureComponent {
  render() {
    const {
      countrySelected,
      countriesOptions,
      handleDropDownChange
    } = this.props;
    return (
      <div>
        <Section className={styles.homeOne} backgroundImage={homeOneBg}>
          <div className={styles.column}>
            <Icon icon={cwLogo} className={styles.cwLogo} />
            <Intro description="Improving understanding of the possible policy and development paths that could lead to decarbonization of the economy in different countries by providing high-quality, global data." />
            <Search />
          </div>
          <div className={cx(styles.column, styles.video)}>
            <Button color="yellow" type="icon" className={styles.fullscreen}>
              <Icon icon={fullscreen} />
            </Button>
            <ReactPlayer
              url="https://www.youtube.com/watch?v=0XsJNU75Si0"
              playing
              youtubeConfig={{
                playerVars: {},
                preload: false
              }}
            />
          </div>
        </Section>
        <Section className={styles.homeTwo} backgroundImage={homeTwoBg}>
          <div className={styles.column}>
            <img src={homeTwoImage} alt="home-section-two" />
          </div>
          <div className={styles.column}>
            <Intro
              theme={introTheme}
              title="Explore the country factsheets"
              description="Check each country or region’s progress on climate action lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            />
            <div className={styles.doubleFold}>
              <Button
                color="yellow"
                link={`/countries/${countrySelected
                  ? countrySelected.value
                  : ''}`}
              >
                Explore your country
              </Button>
              <Dropdown
                placeholder="Select another country"
                options={countriesOptions}
                onChange={handleDropDownChange}
                value={countrySelected}
                clearable={false}
              />
            </div>
          </div>
        </Section>
        <Section className={styles.homeThree} backgroundImage={homeThreeBg}>
          <div className={styles.column}>
            <Intro
              theme={introTheme}
              title="See and compare the Nationally Determined Contributions"
              description="Check each country or region’s progress on climate action lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            />
            <div className={styles.doubleFold}>
              <Button color="yellow" link="/ndcs">
                Explore NDC content
              </Button>
              <Button color="white" link="/ndcs/compare">
                Compare NDCs
              </Button>
            </div>
          </div>
          <div className={styles.column}>
            <img src={homeThreeImage} alt="home-section-one" />
          </div>
        </Section>
      </div>
    );
  }
}

Home.propTypes = {
  countrySelected: PropTypes.object,
  countriesOptions: PropTypes.array,
  handleDropDownChange: PropTypes.func
};

Home.defaultProps = {
  countriesOptions: []
};

export default Home;
