import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import NDCSPreviousComparisonProvider from 'providers/ndcs-previous-comparison-provider';
import NDCS2025ComparisonProvider from 'providers/ndcs-2025-comparison-provider';
import AbbrReplace from 'components/abbr-replace';
import Loading from 'components/loading';
import PreviousSubmissionIcon from 'components/previous-submission-icon';
import styles from './country-climate-enhancements-styles.scss';

function CountryClimateEnhancements({ comparisonIndicators, countryName }) {
  const [tooltipContent, setTooltipContent] = useState(null);

  const handleTooltip = useCallback((evt) => {
    setTooltipContent(evt.target.dataset['tooltip-content']);
  }, []);

  const renderComparisonIndicators = () =>
    comparisonIndicators && (
      <div className={styles.previousComparisonContainer}>
        <h3 className={styles.title}>
          Has {countryName} enhanced its NDC compared to the previous
          submission?
        </h3>
        <div className={styles.descriptionContainer}>
          <AbbrReplace>
            <p>
              The Paris Agreement calls on countries to deliver new Nationally
              Determined Contributions (NDCs) every five years that are informed
              by the latest advances in technology, science and shifting
              economic trends. The following indicators assess whether the
              country has increased its level of ambition across these key
              areas.
            </p>
          </AbbrReplace>
        </div>
        <div className={styles.previousComparison}>
          {comparisonIndicators.map(({ name, value }) => (
            <div
              key={name}
              className={styles.item}
              data-tooltip-content={value}
              onMouseMove={handleTooltip}
            >
              <PreviousSubmissionIcon
                value={value}
                tooltipId="definition-icon"
                className={styles.icon}
              />
              <div className={styles.valueKey}>{name}</div>
            </div>
          ))}
        </div>
      </div>
    );

  return (
    <div className={styles.gridContainer}>
      <div className={styles.grid}>
        <div className={styles.container}>
          {comparisonIndicators ? (
            renderComparisonIndicators()
          ) : (
            <Loading light className={styles.loading} />
          )}
        </div>
      </div>
      <ReactTooltip id="definition-icon">{tooltipContent}</ReactTooltip>
      <NDCSPreviousComparisonProvider />
      <NDCS2025ComparisonProvider />
    </div>
  );
}

CountryClimateEnhancements.propTypes = {
  comparisonIndicators: PropTypes.array,
  countryName: PropTypes.string.isRequired
};

export default CountryClimateEnhancements;
