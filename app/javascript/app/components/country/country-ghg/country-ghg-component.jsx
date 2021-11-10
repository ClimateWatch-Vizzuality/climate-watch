import React from 'react';
import CountryGHGEmissions from 'components/country/country-ghg-emissions';
import EmissionsMetaProvider from 'providers/ghg-emissions-meta-provider';
import WbCountryDataProvider from 'providers/wb-country-data-provider';
import PropTypes from 'prop-types';
import { CALCULATION_OPTIONS } from 'app/data/constants';
import Button from 'components/button';
import EmissionSourcesChart from 'components/country/emission-sources-chart';
import InfoButton from 'components/button/info-button';
import Disclaimer from 'components/disclaimer';
import ModalMetadata from 'components/modal-metadata';
import { isPageContained } from 'utils/navigation';
import cx from 'classnames';

import layout from 'styles/layout';
import styles from './country-ghg-styles.scss';

const FEATURE_ENHANCEMENT_CHANGES =
  process.env.FEATURE_ENHANCEMENT_CHANGES === 'true';

function CountryGhg(props) {
  const {
    search,
    isEmbedded,
    countryName,
    isNdcp,
    handleAnalyticsClick,
    iso,
    handleInfoClick
  } = props;

  const renderExploreButton = () => {
    const link = `/ghg-emissions?breakBy=regions-${CALCULATION_OPTIONS.ABSOLUTE_VALUE.value}&regions=${iso}`;
    const href = `/contained${link}&isNdcp=true`;
    return (
      <Button
        key="action2"
        className={styles.exploreBtn}
        variant="primary"
        href={isNdcp ? href : null}
        link={isNdcp ? null : link}
        onClick={handleAnalyticsClick}
        dataTour="countries-03"
      >
        Explore Emissions
      </Button>
    );
  };
  const needsWBData =
    search.calculation &&
    search.calculation !== CALCULATION_OPTIONS.ABSOLUTE_VALUE.value;
  return (
    <div>
      <div>
        {FEATURE_ENHANCEMENT_CHANGES && (
          <React.Fragment>
            <div className={styles.titleRow}>
              <div>
                <h3 className={styles.title}>
                  What are {countryName}
                  {"'"}s greenhouse gas emissions and emission targets?{' '}
                </h3>
                <p className={styles.description}>
                  The default data source is CAIT. For non-annex I countries,
                  national inventory data can be found in the UNFCCC timeline on
                  the top of the page.
                </p>
              </div>
              <div className={styles.buttons}>
                <InfoButton
                  className={styles.infoBtn}
                  infoOpen={false}
                  handleInfoClick={handleInfoClick}
                  square
                />
                {renderExploreButton()}
              </div>
            </div>
            <EmissionSourcesChart iso={iso} />
          </React.Fragment>
        )}
        <div className={cx(styles.content, { [styles.embedded]: isEmbedded })}>
          <EmissionsMetaProvider />
          {needsWBData && <WbCountryDataProvider />}
          <CountryGHGEmissions />
        </div>
      </div>
      {!isPageContained && (
        <Disclaimer className={cx(styles.disclaimer, layout.content)} />
      )}
      <ModalMetadata />
    </div>
  );
}

CountryGhg.propTypes = {
  search: PropTypes.object,
  isEmbedded: PropTypes.bool,
  isNdcp: PropTypes.bool,
  handleAnalyticsClick: PropTypes.func.isRequired,
  handleInfoClick: PropTypes.func.isRequired,
  countryName: PropTypes.string,
  iso: PropTypes.string
};

export default CountryGhg;
