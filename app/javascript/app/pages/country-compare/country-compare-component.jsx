import React from 'react';
import PropTypes from 'prop-types';
import Sticky from 'react-stickynode';
import Waypoint from 'react-waypoint';

import Header from 'components/header';
import Intro from 'components/intro';
import AnchorNav from 'components/anchor-nav';
import CountryCompareSelector from 'components/country-compare/country-compare-selector';
import CountrySelectorFooter from 'components/country-selector-footer';
import ModalMetadata from 'components/modal-metadata';
import { isPageContained } from 'utils/navigation';
import { STICKY_OFFSET } from 'styles/constants';

import layout from 'styles/layout.scss';
import anchorNavRegularTheme from 'styles/themes/anchor-nav/anchor-nav-regular.scss';
import { TabletLandscape, Desktop } from 'components/responsive';
import styles from './country-compare-styles.scss';

const CountryCompare = ({ route, anchorLinks, setActiveSection }) => (
  <TabletLandscape>
    {isLandscape => (
      <div>
        <Header route={route}>
          <div className={layout.content}>
            <Intro title={'Country Comparison'} />
          </div>
          <Sticky activeClass="sticky -country-compare" top="#navBarMobile">
            <AnchorNav
              links={anchorLinks}
              className={styles.anchorNav}
              theme={anchorNavRegularTheme}
              offset={[-150, -100, -100]}
            />
          </Sticky>
        </Header>
        <Desktop>
          {isDesktop =>
            (isLandscape ? (
              <Sticky
                activeClass="sticky"
                top={isDesktop ? STICKY_OFFSET.desktop : STICKY_OFFSET.mobile}
              >
                <CountryCompareSelector className={styles.countrySelectors} />
              </Sticky>
            ) : null)
          }
        </Desktop>
        {route.sections &&
          route.sections.length > 0 &&
          route.sections
            .filter(s => !(isPageContained && s.excludeFromContained))
            .map(section => (
              <Waypoint
                scrollableAncestor={window}
                bottomOffset={'69%'}
                topOffset={'30%'}
                onEnter={() => {
                  setActiveSection(section.hash);
                }}
                fireOnRapidScroll={false}
                key={section.hash}
              >
                <section id={section.hash} className={styles.section}>
                  <section.component />
                </section>
              </Waypoint>
            ))}
        {!isLandscape ? <CountrySelectorFooter /> : null}
        <ModalMetadata />
      </div>
    )}
  </TabletLandscape>
);

CountryCompare.propTypes = {
  route: PropTypes.object.isRequired,
  anchorLinks: PropTypes.array.isRequired,
  setActiveSection: PropTypes.func.isRequired
};

export default CountryCompare;
