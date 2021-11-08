import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import NDCSProvider from 'providers/ndcs-provider';
import { INDICATOR_SLUGS } from 'data/constants';
import styles from './emission-sources-chart-styles.scss';

function EmissionSourcesChart({ emissions, iso }) {
  return (
    <div className={styles.emissionSources}>
      <div className={styles.worldSharePosition}>
        {emissions &&
          emissions.map((e, i) => (
            <React.Fragment>
              <span
                className={cx(styles.emissionCountry, {
                  [styles.currentCountry]: iso === e.iso
                })}
                style={{ width: `${e.percentage}%`, backgroundColor: e.color }}
              >
                {iso === e.iso && (
                  <span className={styles.currentCountryText}>
                    {iso} is the World{"'"}s {i === 0 ? '1st' : `${i + 1}rd`}{' '}
                    largest emitter, with a total share of {e.percentage}%{' '}
                  </span>
                )}
              </span>
            </React.Fragment>
          ))}
      </div>
      <div className={styles.countrySector}>Country sectors</div>
      <NDCSProvider
        overrideFilter
        additionalIndicatorSlugs={[INDICATOR_SLUGS.emissions]}
      />
    </div>
  );
}

EmissionSourcesChart.propTypes = {
  emissions: PropTypes.array,
  iso: PropTypes.string
};

export default EmissionSourcesChart;
