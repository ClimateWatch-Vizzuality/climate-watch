import React from 'react';
import cx from 'classnames';
import {
  ENHANCEMENT_VALUE_COLORS,
  ENHANCEMENT_VALUES_COLORS,
  ENHANCEMENT_LABELS_WITH_LETTERS
} from 'data/constants';
import styles from './enhancements-legend.scss';

function EnhancementsLegend() {
  return (
    <div className={styles.enhancementsLegend}>
      <div className={styles.enhancementsLegendValues}>
        {Object.keys(ENHANCEMENT_VALUES_COLORS).map(value => (
          <div className={styles.value}>
            <div
              className={cx(styles.enhancementsIcon, {
                [styles.withBorder]:
                  ENHANCEMENT_VALUES_COLORS[value] &&
                  ENHANCEMENT_VALUES_COLORS[value] !==
                    ENHANCEMENT_VALUE_COLORS.white
              })}
              style={{ backgroundColor: ENHANCEMENT_VALUES_COLORS[value] }}
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
