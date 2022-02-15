import React from 'react';
import cx from 'classnames';
import {
  ENHANCEMENT_LABELS_WITH_LETTERS,
  ENHANCEMENT_LABEL_COLORS,
  LEGEND_ENHANCEMENT_VALUES_COLORS
} from 'data/constants';
import styles from './enhancements-legend.scss';

function EnhancementsLegend() {
  return (
    <div className={styles.enhancementsLegend}>
      <div className={styles.enhancementsLegendNDCValues}>
        <div className={styles.value}>
          <div
            className={cx(styles.enhancementsIcon)}
            style={{
              backgroundColor: ENHANCEMENT_LABEL_COLORS.ENHANCED_MITIGATION
            }}
          />
          <div>Submitted New or Updated NDC with Reduced Total Emissions</div>
        </div>
        <div className={styles.value}>
          <div
            className={cx(styles.enhancementsIcon)}
            style={{
              backgroundColor: ENHANCEMENT_LABEL_COLORS.SUBMITTED_2020
            }}
          />
          <div>Submitted New or Updated NDC</div>
        </div>
      </div>
      <div className={styles.enhancementsLegendValues}>
        {Object.keys(LEGEND_ENHANCEMENT_VALUES_COLORS).map(value => (
          <div className={styles.value}>
            <div
              className={cx(styles.enhancementsIcon, styles.withBorder)}
              style={{
                backgroundColor: LEGEND_ENHANCEMENT_VALUES_COLORS[value]
              }}
            />
            <div>{value}</div>
          </div>
        ))}
      </div>
      <div className={styles.enhancementsLegendIndicators}>
        {ENHANCEMENT_LABELS_WITH_LETTERS.map(indicator => (
          <div className={styles.indicator}>
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

export default EnhancementsLegend;
