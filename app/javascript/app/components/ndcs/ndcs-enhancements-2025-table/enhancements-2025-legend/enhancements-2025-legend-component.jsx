import React from 'react';
import cx from 'classnames';
import {
  LEGEND_STATUS_2025_VALUES_COLORS, LEGEND_COMPARISON_2025_VALUES_COLORS, LEGEND_COMPARISON_2025_LETTERS,
} from 'data/constants';
import styles from './enhancements-2025-legend.scss';

function Enhancements2025Legend() {
  return (
    <div className={styles.enhancementsLegend}>
      <div className={styles.enhancementsLegendNDCValues}>
        {Object.entries(LEGEND_STATUS_2025_VALUES_COLORS).map(([key, value]) =>
          <div key={key} className={styles.value}>
            <div
              className={cx(styles.enhancementsIcon)}
              style={{
                backgroundColor: value
              }}
            />
          <div>{key}</div>
        </div>)}
      </div>
      <div className={styles.enhancementsLegendValues}>
        {Object.entries(LEGEND_COMPARISON_2025_VALUES_COLORS).map(([key, value]) => (
          <div key={key} className={styles.value}>
            <div
              className={cx(styles.enhancementsIcon, styles.withBorder)}
              style={{
                backgroundColor: value
              }}
            />
            <div>{key}</div>
          </div>
        ))}
      </div>
      <div className={styles.enhancementsLegendIndicators}>
        {LEGEND_COMPARISON_2025_LETTERS.map(indicator => (
          <div key={indicator.letter} className={styles.indicator}>
            <div className={cx(styles.enhancementsIndicatorLetter)}>
              {indicator.letter}
            </div>
            <div>{indicator.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Enhancements2025Legend;
