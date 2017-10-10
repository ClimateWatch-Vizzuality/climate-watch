import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Intro from 'components/intro';
import Section from 'components/section';
import Icon from 'components/icon';
import Button from 'components/button';
import Dropdown from 'components/dropdown';
import AutocompleteSearch from 'components/autocomplete-search';
import Stories from 'components/stories';
import ReactPlayer from 'react-player';
import cx from 'classnames';
import GeoLocationProvider from 'providers/geolocation-provider';

import cwLogo from 'assets/icons/cw-logo-white.svg';
import fullscreen from 'assets/icons/map-fullscreen.svg';
import background from 'assets/headers/home.jpg';
import countryScreenshot from 'assets/screenshots/country';
import ndcScreenshot from 'assets/screenshots/ndc-explore';
import ndcSdgScreenshot from 'assets/screenshots/ndc-sdg';
import theme from 'styles/themes/dropdown/dropdown-links.scss';

import introDark from 'styles/themes/intro/intro-dark.scss';
import layout from 'styles/layout.scss';
import styles from './home-styles.scss';

class Home extends PureComponent {
  render() {
    const { geolocation, countriesOptions, handleDropDownChange } = this.props;
    return (
      <div className={styles.homeBg}>
        <Section className={styles.section} backgroundImage={background}>
          <div className={styles.column}>
            <Icon icon={cwLogo} className={styles.cwLogo} />
            <Intro description="A global platform for climate action that offers open data, visualizations and analysis to help policymakers, researchers and other stakeholders gather insights on countries’ climate progress." />
            <AutocompleteSearch />
          </div>
          <div className={cx(styles.column, styles.video)}>
            <Button color="yellow" className={styles.fullscreen} square>
              <Icon icon={fullscreen} />
            </Button>
            <ReactPlayer
              url="https://www.youtube.com/watch?v=lTG-0brb98I"
              youtubeConfig={{
                playerVars: {},
                preload: false
              }}
            />
          </div>
        </Section>
        <div className={cx(layout.content, styles.stories)}>
          <Stories />
        </div>
        <Section className={cx(styles.section, styles.countries)}>
          <div className={styles.column}>
            <img
              className={styles.imageTall}
              src={countryScreenshot}
              alt="Country section screenshot"
            />
          </div>
          <div className={styles.column}>
            <Intro
              theme={introDark}
              title="Explore the country profiles"
              description="Check each country or region’s progress on climate action lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            />
            <GeoLocationProvider />
            <span
              className={cx(styles.geoLocation, {
                [styles.geoLocationHide]: !geolocation.country
              })}
            >
              Connected from {geolocation.country}?
            </span>
            <div className={styles.doubleFold}>
              <Button
                color="yellow"
                link={`/countries/${geolocation.iso ? geolocation.iso : ''}`}
              >
                Explore your country
              </Button>
              <Dropdown
                className={theme.dropdownOptionWithArrow}
                placeholder="Select another country"
                options={countriesOptions}
                onValueChange={handleDropDownChange}
                plain
                hideResetButton
              />
            </div>
          </div>
        </Section>
        <Section className={cx(styles.section, styles.ndcs)}>
          <div className={styles.column}>
            <Intro
              theme={introDark}
              title="See and compare the Nationally Determined Contributions"
              description="Check each country or region’s progress on climate action lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            />
            <div className={styles.doubleFold}>
              <Button color="yellow" link="/ndcs">
                Explore NDC content
              </Button>
              <Button color="plain" link="/ndcs/compare">
                Compare NDCs
              </Button>
            </div>
          </div>
          <div className={styles.column}>
            <img
              className={styles.imageRight}
              src={ndcScreenshot}
              alt="Ndcs section screenshot"
            />
          </div>
        </Section>
        <Section className={styles.section}>
          <div className={styles.column}>
            <img
              className={styles.imageLeft}
              src={ndcSdgScreenshot}
              alt="NDC SDGs screenshot"
            />
          </div>
          <div className={styles.column}>
            <Intro
              theme={introDark}
              title="See how the NDCs align with the SDGs..."
              description="Check each country or region’s progress on climate action lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            />
            <div className={styles.doubleFold}>
              <Button color="yellow" link={'/ndcs/sdgs'}>
                Explore NDC-SDG Linkages
              </Button>
            </div>
          </div>
        </Section>
      </div>
    );
  }
}

Home.propTypes = {
  geolocation: PropTypes.object,
  countriesOptions: PropTypes.array,
  handleDropDownChange: PropTypes.func
};

Home.defaultProps = {
  geolocation: {},
  countriesOptions: []
};

export default Home;
