/* eslint-disable no-confusing-arrow */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Sticky from 'react-stickynode';
import Waypoint from 'react-waypoint';
import { SEO_PAGES } from 'data/seo';
import { INDICATOR_SLUGS } from 'data/constants';
import SEOTags from 'components/seo-tags';
import { isPageContained } from 'utils/navigation';
import Header from 'components/header';
import CountryTimeline from 'components/country/country-timeline';
import Intro from 'components/intro';
import Button from 'components/button';
import AnchorNav from 'components/anchor-nav';
import SocioeconomicsProvider from 'providers/socioeconomics-provider';
import anchorNavRegularTheme from 'styles/themes/anchor-nav/anchor-nav-regular.scss';
import EmissionsProvider from 'providers/emissions-provider';
import EmissionsMetaProvider from 'providers/ghg-emissions-meta-provider';
import NDCSProvider from 'providers/ndcs-provider';
import layout from 'styles/layout.scss';
import styles from './country-styles.scss';

const FEATURE_COUNTRY_CHANGES = process.env.FEATURE_COUNTRY_CHANGES === 'true';

class Country extends PureComponent {
  render() {
    const {
      route,
      country,
      anchorLinks,
      description,
      setActiveSection,
      emissionProviderFilters
    } = this.props;
    const countryName = (country && country.name) || '';

    const renderHeader = () =>
      FEATURE_COUNTRY_CHANGES ? (
        <div className={styles.headerContainer}>
          <div className={styles.mainContent}>
            <div className={styles.header}>
              <Intro title={country.name} description={description} />
            </div>
            <div className={styles.compareButton}>
              {!isPageContained && (
                <Button
                  variant="primary"
                  link={`/countries/compare?locations=${country.iso}`}
                >
                  Compare
                </Button>
              )}
            </div>
            <CountryTimeline />
          </div>
          <div className={styles.nationalContext}>National Context</div>
          <EmissionsMetaProvider />
          <EmissionsProvider filters={emissionProviderFilters} />
          <NDCSProvider
            overrideFilter
            additionalIndicatorSlugs={[INDICATOR_SLUGS.emissions]}
          />
        </div>
      ) : (
        <React.Fragment>
          <div className={styles.header}>
            <Intro title={country.name} description={description} />
            {!isPageContained && (
              <Button
                variant="primary"
                link={`/countries/compare?locations=${country.iso}`}
              >
                Compare
              </Button>
            )}
          </div>
          <div className={layout.content}>
            <CountryTimeline />
          </div>
        </React.Fragment>
      );
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
          {renderHeader()}
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
                <section.component />
              </div>
            </Waypoint>
          ))}
      </div>
    );
  }
}

Country.propTypes = {
  country: PropTypes.shape({
    iso: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  description: PropTypes.string,
  anchorLinks: PropTypes.array.isRequired,
  route: PropTypes.object.isRequired,
  setActiveSection: PropTypes.func.isRequired,
  emissionProviderFilters: PropTypes.oobject
};

export default Country;
