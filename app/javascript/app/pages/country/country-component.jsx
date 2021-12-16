/* eslint-disable no-confusing-arrow */
import React from 'react';
import PropTypes from 'prop-types';
import Sticky from 'react-stickynode';
import Waypoint from 'react-waypoint';
import { SEO_PAGES } from 'data/seo';
import SEOTags from 'components/seo-tags';
import Header from 'components/header';
import AnchorNav from 'components/anchor-nav';
import SocioeconomicsProvider from 'providers/socioeconomics-provider';
import anchorNavRegularTheme from 'styles/themes/anchor-nav/anchor-nav-regular.scss';
import ErrorBoundary from 'components/error-boundary';
import CountryHeader from './country-header';

import styles from './country-styles.scss';

function Country(props) {
  const { route, country, anchorLinks, setActiveSection } = props;
  const countryName = (country && country.name) || '';

  return (
    <div>
      {countryName && (
        <SEOTags
          page={SEO_PAGES.country}
          dynamicTitlePart={countryName}
          href={location.href}
          countryName={countryName}
          canonicalAttribute={country && country.iso}
        />
      )}
      <SocioeconomicsProvider />
      <Header route={route}>
        <CountryHeader />
        <Sticky activeClass="sticky -country" top="#navBarMobile">
          <AnchorNav
            links={anchorLinks}
            className={styles.anchorNav}
            theme={anchorNavRegularTheme}
            dataTour="countries-02"
          />
        </Sticky>
      </Header>
      {route.sections &&
        route.sections.length > 0 &&
        route.sections.map(section => (
          <Waypoint
            bottomOffset={'40%'}
            topOffset={'40%'}
            onEnter={() => {
              setActiveSection(section.hash);
            }}
            fireOnRapidScroll={false}
            key={section.hash}
          >
            <div className={styles.section}>
              <div id={section.hash} className={styles.sectionHash} />
              <ErrorBoundary
                className={styles.sectionError}
                errorMessage={`Something went wrong while rendering ${section.label} section.`}
              >
                <section.component />
              </ErrorBoundary>
            </div>
          </Waypoint>
        ))}
    </div>
  );
}

Country.propTypes = {
  country: PropTypes.shape({
    iso: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  anchorLinks: PropTypes.array.isRequired,
  route: PropTypes.object.isRequired,
  setActiveSection: PropTypes.func.isRequired
};

export default Country;
