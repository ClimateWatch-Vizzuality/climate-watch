/* eslint-disable no-confusing-arrow */
import React from 'react';
import PropTypes from 'prop-types';
import { INDICATOR_SLUGS, EXTERNAL_COUNTRY_LINKS } from 'data/constants';
import Card from 'components/card';
import InfoButton from 'components/button/info-button';
import Icon from 'components/icon';
import { isPageContained } from 'utils/navigation';
import CountryTimeline from 'components/country/country-timeline';
import Intro from 'components/intro';
import Button from 'components/button';
import cardSimpleTheme from 'styles/themes/card/card-simple.scss';
import EmissionsProvider from 'providers/emissions-provider';
import EmissionsMetaProvider from 'providers/ghg-emissions-meta-provider';
import NDCSProvider from 'providers/ndcs-provider';
import layout from 'styles/layout.scss';
import externalLink from 'assets/icons/external-link.svg';
import styles from './country-header-styles.scss';

const FEATURE_COUNTRY_CHANGES = process.env.FEATURE_COUNTRY_CHANGES === 'true';

function CountryHeader(props) {
  const {
    country,
    description,
    emissionProviderFilters,
    handleInfoClick,
    cardData
  } = props;
  const countryName = (country && country.name) || '';

  const renderCard = c => (
    <Card theme={cardSimpleTheme} key={c.slug}>
      <div className={styles.cardContent}>
        <div className={styles.title}>{c.title}</div>
        <div className={styles.progressBar}>
          <div
            className={styles.marker}
            style={{ left: c.worldPositionPercentage }}
          />
        </div>
        <div className={styles.value}>{c.value}</div>
      </div>
      <InfoButton
        className={styles.infoBtn}
        infoOpen={false}
        handleInfoClick={() => handleInfoClick(0)}
      />
    </Card>
  );

  if (FEATURE_COUNTRY_CHANGES) {
    const renderExternalLink = (
      <a
        className={styles.countryPlatformLink}
        title={`${countryName} country platform`}
        href={EXTERNAL_COUNTRY_LINKS[country.name.toLowerCase()]}
      >
        {`Go to ${countryName}'s country Platform`}
        <Icon icon={externalLink} className={styles.icon} />
      </a>
    );

    return (
      <div className={styles.headerContainer}>
        <div className={styles.mainContent}>
          <div className={styles.header}>
            <Intro title={country.name} description={description} />
            {Object.keys(EXTERNAL_COUNTRY_LINKS).includes(
              country.name.toLowerCase()
            ) && renderExternalLink}
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
        <div className={styles.nationalContext}>
          <h3>National Context</h3>
          <div className={styles.cards}>{cardData.map(c => renderCard(c))}</div>
        </div>
        <EmissionsMetaProvider />
        <EmissionsProvider filters={emissionProviderFilters} />
        <NDCSProvider
          overrideFilter
          additionalIndicatorSlugs={[INDICATOR_SLUGS.emissions]}
        />
      </div>
    );
  }
  return (
    <React.Fragment>
      <div className={styles.legacyHeader}>
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
}

CountryHeader.propTypes = {
  country: PropTypes.shape({
    iso: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  description: PropTypes.string,
  cardData: PropTypes.array,
  handleInfoClick: PropTypes.func.isRequired,
  emissionProviderFilters: PropTypes.oobject
};

export default CountryHeader;