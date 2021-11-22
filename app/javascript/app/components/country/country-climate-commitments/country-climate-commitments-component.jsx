import React from 'react';
import PropTypes from 'prop-types';
import CountriesDocumentsProvider from 'providers/countries-documents-provider';
import Icon from 'components/icon';
import Loading from 'components/loading';
import Button from 'components/button';
import submittedIcon from 'assets/icons/compare-submitted.svg';
import notSubmittedIcon from 'assets/icons/compare-not-submitted.svg';
import intendsIcon from 'assets/icons/compare-intends.svg';
import { handleAnalytics } from 'utils/analytics';
import { SUBMISSION_ICON_VALUE } from 'data/country-documents';
import NDCSProvider from 'providers/ndcs-provider';
import { INDICATOR_SLUGS } from 'data/constants';
import arcOfAmbition from 'assets/countries/arc-of-ambition.png';
import styles from './country-climate-commitments-styles.scss';

function CountryClimateCommitments({
  countriesDocumentsValues,
  iso,
  countryName
}) {
  const countryDocumentsIcons = {
    [SUBMISSION_ICON_VALUE.yes]: submittedIcon,
    [SUBMISSION_ICON_VALUE.no]: notSubmittedIcon,
    [SUBMISSION_ICON_VALUE.intends]: intendsIcon
  };

  const countryDocumentsLabels = {
    [SUBMISSION_ICON_VALUE.yes]: 'Submitted',
    [SUBMISSION_ICON_VALUE.no]: 'Not submitted',
    [SUBMISSION_ICON_VALUE.intends]: 'Intends to submit'
  };

  const renderDocumentsPart = () =>
    countriesDocumentsValues && (
      <div className={styles.documentsContainer}>
        <div className={styles.documentsTitle}>
          <h3 className={styles.title}>
            {countryName
              ? `What climate commitments has ${countryName} submitted?`
              : 'What climate commitments have been submitted?'}
          </h3>
          {renderButton()}
        </div>
        <div className={styles.ambitionContainer}>
          <div className={styles.arcOfAmbition}>
            <img src={arcOfAmbition} title="Arc of ambition" />
          </div>
          <div className={styles.documents}>
            {countriesDocumentsValues.map(([key, value]) => (
              <div className={styles.item}>
                {countryDocumentsIcons[+value] && (
                  <React.Fragment>
                    <Icon
                      icon={countryDocumentsIcons[+value]}
                      className={styles.icon}
                    />
                    <span>{key}</span>
                    <div className={styles.valueDescription}>
                      {countryDocumentsLabels[+value]}
                    </div>
                  </React.Fragment>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );

  const renderButton = () => (
    <Button
      className={styles.commitmentsButton}
      variant="primary"
      link={'/ndc-overview'}
      onClick={() =>
        handleAnalytics('Home', 'Click from a home page link', 'NDC Overview')
      }
    >
      Explore more commitments
    </Button>
  );

  return (
    <div className={styles.gridContainer}>
      <div className={styles.grid}>
        <div className={styles.container}>
          {countriesDocumentsValues ? (
            <React.Fragment>{renderDocumentsPart()}</React.Fragment>
          ) : (
            <Loading light className={styles.loading} />
          )}
        </div>
      </div>
      <CountriesDocumentsProvider location={iso} />
      <NDCSProvider
        overrideFilter
        indicatorSlugs={['nz_status', INDICATOR_SLUGS.enhancements]}
      />
    </div>
  );
}

CountryClimateCommitments.propTypes = {
  countriesDocumentsValues: PropTypes.array,
  iso: PropTypes.string,
  countryName: PropTypes.string
};

export default CountryClimateCommitments;
