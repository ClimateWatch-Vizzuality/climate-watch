import React from 'react';
import PropTypes from 'prop-types';
// import cx from 'classnames';
import NDCSPreviousComparisonProvider from 'providers/ndcs-previous-comparison-provider';
import CountriesDocumentsProvider from 'providers/countries-documents-provider';
import layout from 'styles/layout';
import styles from './country-climate-commitments-styles.scss';

const FEATURE_ENHANCEMENT_CHANGES =
  process.env.FEATURE_ENHANCEMENT_CHANGES === 'true';

function CountryClimateCommitments({ indicators, iso }) {
  console.info(indicators);
  return (
    <div className={layout.content}>
      <div className={styles.grid}>Hi</div>{' '}
      {FEATURE_ENHANCEMENT_CHANGES && (
        <React.Fragment>
          <NDCSPreviousComparisonProvider />
          <CountriesDocumentsProvider location={iso} />
        </React.Fragment>
      )}
    </div>
  );
}

CountryClimateCommitments.propTypes = {
  indicators: PropTypes.array,
  iso: PropTypes.string
};

export default CountryClimateCommitments;
