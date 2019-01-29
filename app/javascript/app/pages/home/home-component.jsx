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
import { MobileOnly, TabletLandscape } from 'components/responsive';

import cwLogo from 'assets/icons/cw-logo-white.svg';
import fullscreen from 'assets/icons/map-fullscreen.svg';
import background from 'assets/headers/home.jpg';
import countryBgScreenshot from 'assets/screenshots/country-with-quantifications@1x.png';
import countrySmScreenshot from 'assets/screenshots/country-mobile-screenshot@2x.png';
import ndcBgScreenshot from 'assets/screenshots/ndc-explore-bg-screenshot';
import ndcSmScreenshot from 'assets/screenshots/ndc-explore-sm-screenshot@2x.png';
import ndcSdgBgScreenshot from 'assets/screenshots/ndc-sdg-bg-screenshot';
import ndcSdgSmScreenshot from 'assets/screenshots/ndc-sdg-sm-screenshot@2x.png';
import ghgBgScreenshot from 'assets/screenshots/ghg-screenshot@1x.png';
import ghgMobileScreenshot from 'assets/screenshots/ghg-mobile-screenshot@2x.png';
import pathwaysBgScreenshot from 'assets/screenshots/pathways-screenshot@2x.png';
import pathwaysMobileScreenshot from 'assets/screenshots/pathways-mobile-screenshot@2x.png';
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
            <Intro description="Climate Watch offers open data, visualizations and analysis to help policymakers, researchers and other stakeholders gather insights on countries' climate progress." />
            <AutocompleteSearch />
          </div>
          <div className={cx(styles.column, styles.video)}>
            <TabletLandscape>
              <Button
                color="yellow"
                onClick={this.onClickFullscreen}
                className={styles.fullscreen}
                square
              >
                <Icon icon={fullscreen} />
              </Button>
            </TabletLandscape>
            <ReactPlayer
              width="100%"
              height="100%"
              ref={player => {
                this.player = player;
              }}
              url="https://youtu.be/C2nIcBqrHsk"
              controls
              youtubeConfig={{
                playerVars: {
                  playsinline: 0,
                  fs: 0 // remove full screen button
                },
                preload: true
              }}
            />
          </div>
        </Section>
        <div className={cx(layout.content, styles.section)}>
          <Stories />
        </div>
        <Section className={cx(styles.section, styles.countries)}>
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
        </Section>
        <Section
          className={cx(styles.section, styles.extraPadding, styles.ndcs)}
        >
          <div className={styles.column}>
            <Intro
              theme={introDark}
              title="Explore and Compare Nationally Determined Contributions"
              description="169 nationally determined contributions (NDCs) representing 192 countries and the European Union have been submitted to the UN Framework Convention on Climate Change.<br />Analyze and compare NDCs of all countries using 150 structured indicators and search the full text for key terms."
            />
            <div className={styles.doubleFold}>
              <Button color="yellow" link="/ndcs-content">
                Explore NDC content
              </Button>
              <TabletLandscape>
                <Button color="plain" link="/ndcs/compare">
                  Compare NDCs
                </Button>
              </TabletLandscape>
            </div>
          </div>
          <MobileOnly>
            {matches => (
              <div className={matches ? styles.ndcImageMobile : styles.column}>
                <div className={styles.imgContainer}>
                  <img
                    className={matches ? '' : styles.imageRight}
                    src={matches ? ndcSmScreenshot : ndcBgScreenshot}
                    alt="Ndcs section screenshot"
                  />
                </div>
              </div>
            )}
          </MobileOnly>
        </Section>
        <Section
          className={cx(
            styles.section,
            styles.extraPadding,
            styles.sdgLinkages
          )}
        >
          <MobileOnly>
            {matches => (
              <div
                className={cx(
                  styles.column,
                  styles.invertOrder,
                  layout.screenshotMobileLayout
                )}
              >
                <div className={styles.imgLayout}>
                  <div className={styles.imgContainer}>
                    <img
                      className={matches ? '' : styles.imageRight}
                      src={matches ? ndcSdgSmScreenshot : ndcSdgBgScreenshot}
                      alt="NDC SDGs screenshot"
                    />
                  </div>
                </div>
              </div>
            )}
          </MobileOnly>
          <div className={styles.column}>
            <Intro
              theme={introDark}
              title="Examine Links Between Sustainable Development and Climate Goals"
              description="Our research shows that climate actions in NDCs align with at least 154 of the 169 targets of the Sustainable Development Goals (SDGs), demonstrating the enormous potential for linking climate and sustainable development efforts.<br />Identify potential alignment between the targets, actions, policy measures and needs in countries’ NDCs and the targets of the SDGs."
            />
            <div className={styles.doubleFold}>
              <Button color="yellow" link={'/ndcs-sdg'}>
                Explore NDC-SDG Linkages
              </Button>
            </div>
          </div>
        </Section>
        <Section
          className={cx(styles.section, styles.extraPadding, styles.ghg)}
        >
          <div className={styles.column}>
            <Intro
              theme={introDark}
              title="Explore Historical Greenhouse Gas Emissions"
              description="The 10 countries that emit the most greenhouse gases account for over 60% of global emissions, while the 100 least emitters contributed less than 3%.<br />Explore and download over 160 years of greenhouse gas emissions data from 196 countries and the EU, across seven sectors. Our inventory includes datasets sourced from independent research organizations and country self-reported inventories to the UNFCCC."
            />
            <div className={styles.doubleFold}>
              <Button color="yellow" link="/ghg-emissions">
                Explore Historical GHG Emissions
              </Button>
            </div>
          </div>
          <MobileOnly>
            {matches => (
              <div
                className={cx(
                  styles.column,
                  styles.invertOrder,
                  layout.screenshotMobileLayout
                )}
              >
                <div className={styles.imgLayout}>
                  <div className={styles.imgContainer}>
                    <img
                      className={matches ? '' : styles.imageRight}
                      src={matches ? ghgMobileScreenshot : ghgBgScreenshot}
                      alt="GHG Emissions section screenshot"
                    />
                  </div>
                </div>
              </div>
            )}
          </MobileOnly>
        </Section>
        <Section
          className={cx(styles.section, styles.extraPadding, styles.pathways)}
        >
          <MobileOnly>
            {matches => (
              <div
                className={cx(
                  styles.column,
                  styles.invertOrder,
                  layout.screenshotMobileLayout
                )}
              >
                <div className={styles.imgLayout}>
                  <div className={styles.imgContainer}>
                    <img
                      className={matches ? '' : styles.imageRight}
                      src={
                        matches ? (
                          pathwaysMobileScreenshot
                        ) : (
                          pathwaysBgScreenshot
                        )
                      }
                      alt="Pathways section screenshot"
                    />
                  </div>
                </div>
              </div>
            )}
          </MobileOnly>
          <div className={styles.column}>
            <Intro
              theme={introDark}
              title="Chart and Visualize Decarbonization Pathways"
              description="Where are global emissions and global temperatures headed? That all depends on the paths we take.<br />Draw insights from 30 potential future pathways developed by modeling teams from around the world. Pathways helps you navigate through multiple models and visualize scenarios for countries, regions and sectors."
            />
            <div className={styles.doubleFold}>
              <Button color="yellow" link={'/pathways'}>
                Explore Pathways
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
