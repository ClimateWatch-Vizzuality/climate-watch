import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
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
import countryScreenshot from 'assets/screenshots/country-screenshot';
import ndcScreenshot from 'assets/screenshots/ndc-explore-screenshot';
import ndcSdgScreenshot from 'assets/screenshots/ndc-sdg-screenshot';
import theme from 'styles/themes/dropdown/dropdown-links.scss';
import screenfull from 'screenfull';

import introDark from 'styles/themes/intro/intro-dark.scss';
import layout from 'styles/layout.scss';
import styles from './home-styles.scss';

class Home extends PureComponent {
  onClickFullscreen = () => {
    const playerNode = ReactDOM.findDOMNode(this.player); // eslint-disable-line react/no-find-dom-node
    screenfull.request(playerNode);
  };

  render() {
    const { geolocation, countriesOptions, handleDropDownChange } = this.props;
    return (
      <div className={styles.homeBg}>
        <Section className={styles.section} backgroundImage={background}>
          <div className={styles.column}>
            <Icon icon={cwLogo} className={styles.cwLogo} />
            <Intro description="Climate Watch offers open data, visualizations and analysis to help policymakers, researchers and other stakeholders gather insights on countries' climate progress." />
            <AutocompleteSearch />
          </div>
          <div className={cx(styles.column, styles.video)}>
            <Button
              color="yellow"
              onClick={this.onClickFullscreen}
              className={styles.fullscreen}
              square
            >
              <Icon icon={fullscreen} />
            </Button>
            <ReactPlayer
              width="100%"
              height="100%"
              ref={player => {
                this.player = player;
              }}
              url="https://youtu.be/C2nIcBqrHsk"
              youtubeConfig={{
                playerVars: { playsinline: 0 },
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
              title="View Country Profiles"
              description="A snapshot of countries' climate action progress, risks and vulnerability. Navigate through historical and future emissions, climate vulnerabilities and readiness, identify sustainable development linkages and make comparisons between countries."
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
              title="Explore and Compare Nationally Determined Contributions"
              description="Analyze and compare national climate pledges under the Paris Agreement."
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
              title="Examine Links Between Sustainable Development and Climate Goals"
              description="Identify potential alignment between the targets, actions, policies measures and needs in countries’ Nationally Determined Contributions (NDCs) and the targets of the Sustainable Development Goals (SDGs)."
            />
            <div className={styles.doubleFold}>
              <Button color="yellow" link={'/ndcs-sdg'}>
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
