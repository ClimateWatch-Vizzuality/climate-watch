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
// import ReactPlayer from 'react-player';
import cx from 'classnames';
import GeoLocationProvider from 'providers/geolocation-provider';
import { MobileOnly, TabletLandscape } from 'components/responsive';

import CarouselSection from './carousel-section';

import cwLogo from 'assets/icons/cw-logo-white.svg';
import background from 'assets/headers/home.jpg';
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
        <div >
          <CarouselSection />
        </div>
        {/* <Section className={cx(styles.section, styles.countries)}>
          <MobileOnly>
            {matches => (
              <div
                className={cx(
                  styles.column,
                  styles.invertOrder,
                  layout.screenshotMobileLayout
                )}
              >
                <div>
                  <div className={styles.imgLayout}>
                    <div className={styles.imgContainer}>
                      <img
                        className={matches ? '' : styles.imageTall}
                        src={
                          matches ? countrySmScreenshot : countryBgScreenshot
                        }
                        alt="Country section screenshot"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </MobileOnly>
          <div className={styles.column}>
            <Intro
              theme={introDark}
              title="View Country Profiles"
              description="Gain insights on individual countries historical emissions, national climate commitments, climate vulnerabilities and readiness, and sustainable development linkages – and compare this information across countries."
            />
            <GeoLocationProvider />
            <span
              className={cx(styles.geoLocation, {
                [styles.geoLocationHide]: !geolocation.country
              })}
            >
              Connected from {geolocation.country}?
            </span>
            <div className={cx(styles.doubleFold, styles.mobileDoubleAction)}>
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
        </Section> */}
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
