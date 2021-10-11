import React from 'react';
import PropTypes from 'prop-types';
import NDCSPreviousComparisonProvider from 'providers/ndcs-previous-comparison-provider';
import CountriesDocumentsProvider from 'providers/countries-documents-provider';
import Icon from 'components/icon';
import Loading from 'components/loading';
import Button from 'components/button';
import PreviousSubmissionIcon from 'components/previous-submission-icon';
import submittedIcon from 'assets/icons/compare-submitted.svg';
import notSubmittedIcon from 'assets/icons/compare-not-submitted.svg';
import intendsIcon from 'assets/icons/compare-intends.svg';
import { handleAnalytics } from 'utils/analytics';
import { SUBMISSION_ICON_VALUE } from 'data/country-documents';
import NDCSProvider from 'providers/ndcs-provider';
import { INDICATOR_SLUGS } from 'data/constants';
import styles from './country-climate-commitments-styles.scss';

function CountryClimateCommitments({
  countriesDocumentsValues,
  previousComparisonValues,
  iso
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
          <h3 className={styles.title}>Submitted climate submissions</h3>
          {renderButton()}
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
    );

  const renderPreviousComparisonPart = () =>
    previousComparisonValues && (
      <div className={styles.previousComparisonContainer}>
        <h3 className={styles.title}>
          Enhancements compared with previous submission
        </h3>
        <div className={styles.previousComparison}>
          {previousComparisonValues.map(([key, value]) => (
            <div className={styles.item}>
              <PreviousSubmissionIcon
                value={value}
                tooltipId="definition-icon"
                className={styles.icon}
              />
              <div className>{key}</div>
              <div className={styles.valueDescription}>{value}</div>
            </div>
          ))}
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
          {countriesDocumentsValues && previousComparisonValues ? (
            <React.Fragment>
              {renderDocumentsPart()}
              {renderPreviousComparisonPart()}
            </React.Fragment>
          ) : (
            <Loading light className={styles.loading} />
          )}
        </div>
      </div>
      <NDCSPreviousComparisonProvider />
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
  previousComparisonValues: PropTypes.array,
  iso: PropTypes.string
};

export default CountryClimateCommitments;
