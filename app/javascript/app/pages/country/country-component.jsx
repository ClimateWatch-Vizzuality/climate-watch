import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Sticky from 'react-stickynode';
import Waypoint from 'react-waypoint';
import { COUNTRY_PROFILES } from 'data/SEO';
import { MetaDescription, SocialMetadata } from 'components/seo';
import { isPageContained } from 'utils/navigation';
import Header from 'components/header';
import CountryTimeline from 'components/country/country-timeline';
import Intro from 'components/intro';
import Button from 'components/button';
import AnchorNav from 'components/anchor-nav';
import SocioeconomicsProvider from 'providers/socioeconomics-provider';
import anchorNavRegularTheme from 'styles/themes/anchor-nav/anchor-nav-regular.scss';

import layout from 'styles/layout.scss';
import styles from './country-styles.scss';

class Country extends PureComponent {
  render() {
    const {
      route,
      country,
      anchorLinks,
      description,
      setActiveSection
    } = this.props;
    const countryName = (country && country.name) || '';
    return (
      <div>
        <MetaDescription
          descriptionContext={COUNTRY_PROFILES}
          subtitle={countryName}
        />
        <SocialMetadata
          descriptionContext={COUNTRY_PROFILES}
          href={location.href}
        />
        <SocioeconomicsProvider />
        <Header route={route}>
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
          <Sticky activeClass="sticky -country" top="#navBarMobile">
            <AnchorNav
              links={anchorLinks}
              className={styles.anchorNav}
              theme={anchorNavRegularTheme}
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
  setActiveSection: PropTypes.func.isRequired
};

export default Country;
