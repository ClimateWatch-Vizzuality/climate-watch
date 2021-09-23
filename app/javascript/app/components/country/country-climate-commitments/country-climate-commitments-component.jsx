import React from 'react';
import PropTypes from 'prop-types';
import NDCSPreviousComparisonProvider from 'providers/ndcs-previous-comparison-provider';
import CountriesDocumentsProvider from 'providers/countries-documents-provider';
import Icon from 'components/icon';
import Loading from 'components/loading';
import PreviousSubmissionIcon from 'components/previous-submission-icon';
import submittedIcon from 'assets/icons/compare-submitted.svg';
import notSubmittedIcon from 'assets/icons/compare-not-submitted.svg';
import intendsIcon from 'assets/icons/compare-intends.svg';
import { SUBMISSION_ICON_VALUE } from 'data/country-documents';
import ReactTooltip from 'react-tooltip';
import NDCSProvider from 'providers/ndcs-provider';
import { INDICATOR_SLUGS } from 'data/constants';
import styles from './country-climate-commitments-styles.scss';

function CountryClimateCommitments({
  countriesDocumentsValues,
  previousComparisonValues,
  countryName,
  iso
}) {
  const countryDocumentsIcons = {
    [SUBMISSION_ICON_VALUE.yes]: submittedIcon,
    [SUBMISSION_ICON_VALUE.no]: notSubmittedIcon,
    [SUBMISSION_ICON_VALUE.intends]: intendsIcon
  };

  const renderDocumentsPart = () =>
    countriesDocumentsValues && (
      <div className={styles.documents}>
        {countriesDocumentsValues.map(([key, value]) => (
          <div className={styles.item}>
            <div>{key}</div>
            {countryDocumentsIcons[+value] && (
              <React.Fragment>
                <span data-tip={value} data-for="document-icon">
                  <Icon
                    icon={countryDocumentsIcons[+value]}
                    className={styles.icon}
                  />
                </span>
                <ReactTooltip id="document-icon" />
              </React.Fragment>
            )}
          </div>
        ))}
      </div>
    );

  const renderPreviousComparisonPart = () =>
    previousComparisonValues && (
      <div className={styles.previousComparison}>
        {previousComparisonValues.map(([key, value]) => (
          <div className={styles.item}>
            <div className>{key}</div>
            <PreviousSubmissionIcon
              value={value}
              tooltipId="definition-icon"
              className={styles.icon}
            />
            <div className={styles.valueDescription}>{value}</div>
            <ReactTooltip id="definition-icon" />
          </div>
        ))}
      </div>
    );

  return (
    <React.Fragment>
      <div className={styles.grid}>
        <div className={styles.container}>
          <h3 className={styles.title}>
            {countryName
              ? `What climate commitments has ${countryName} submitted?`
              : 'What climate commitments have been submitted?'}
          </h3>
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
    </React.Fragment>
  );
}

CountryClimateCommitments.propTypes = {
  countriesDocumentsValues: PropTypes.array,
  previousComparisonValues: PropTypes.array,
  iso: PropTypes.string,
  countryName: PropTypes.string
};

export default CountryClimateCommitments;
