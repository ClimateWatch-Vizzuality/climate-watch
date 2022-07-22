import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import NDCSPreviousComparisonProvider from 'providers/ndcs-previous-comparison-provider';
import AbbrReplace from 'components/abbr-replace';
import Loading from 'components/loading';
import PreviousSubmissionIcon from 'components/previous-submission-icon';
import styles from './country-climate-enhancements-styles.scss';

function CountryClimateEnhancements({ previousComparisonValues, countryName }) {
  const [tooltipContent, setTooltipContent] = useState(null);

  const handleTooltip = useCallback(evt => {
    setTooltipContent(evt.target.dataset['tooltip-content']);
  }, []);

  const renderPreviousComparisonPart = () =>
    previousComparisonValues && (
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
              economic trends. The following indicators describe whether the
              country enhanced its level of ambition in seven key indicators.
            </p>
          </AbbrReplace>
        </div>
        <div className={styles.previousComparison}>
          {previousComparisonValues.map(([key, value]) => (
            <div
              key={key}
              className={styles.item}
              data-tooltip-content={value}
              onMouseMove={handleTooltip}
            >
              <PreviousSubmissionIcon
                value={value}
                tooltipId="definition-icon"
                className={styles.icon}
              />
              <div className={styles.valueKey}>{key}</div>
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
      <ReactTooltip id="definition-icon">{tooltipContent}</ReactTooltip>
      <NDCSPreviousComparisonProvider />
    </div>
  );
}

CountryClimateEnhancements.propTypes = {
  previousComparisonValues: PropTypes.array,
  countryName: PropTypes.string.isRequired
};

export default CountryClimateEnhancements;
