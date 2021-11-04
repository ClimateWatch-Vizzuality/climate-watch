import React from 'react';
import PropTypes from 'prop-types';
import NDCSPreviousComparisonProvider from 'providers/ndcs-previous-comparison-provider';
import Loading from 'components/loading';
import PreviousSubmissionIcon from 'components/previous-submission-icon';
import styles from './country-climate-enhancements-styles.scss';

function CountryClimateEnhancements({ previousComparisonValues }) {
  const renderPreviousComparisonPart = () =>
    previousComparisonValues && (
      <div className={styles.previousComparisonContainer}>
        <h3 className={styles.title}>
          Have there been enhancements compared with previous submission?
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

  return (
    <div className={styles.gridContainer}>
      <div className={styles.grid}>
        <div className={styles.container}>
          {previousComparisonValues ? (
            renderPreviousComparisonPart()
          ) : (
            <Loading light className={styles.loading} />
          )}
        </div>
      </div>
      <NDCSPreviousComparisonProvider />
    </div>
  );
}

CountryClimateEnhancements.propTypes = {
  previousComparisonValues: PropTypes.array
};

export default CountryClimateEnhancements;
