/* eslint-disable no-confusing-arrow */
import React from 'react';
import cx from 'classnames';
import Proptypes from 'prop-types';

import tooltipStyles from 'styles/themes/chart-tooltip/chart-tooltip.scss';
import styles from '../country-employment-and-costs-styles.scss';

const CountryEmploymentTooltip = ({ datum, config }) => (
  <div className={styles.tooltip}>
    <div className={tooltipStyles.tooltipHeader}>
      <span
        className={cx(tooltipStyles.labelName, tooltipStyles.labelNameBold)}
      >
        2020
      </span>
    </div>
    {config.data &&
      config.data.length > 0 &&
      config.data.map(({ name, value }) =>
        value || value === 0 ? (
          <div key={`tooltip-${name}`} className={tooltipStyles.label}>
            <div className={tooltipStyles.legend}>
              <span
                className={tooltipStyles.labelDot}
                style={{
                  backgroundColor: config.config.theme[name].fill
                }}
              />
              <p
                className={cx(tooltipStyles.labelName, {
                  [tooltipStyles.notAvailable]: !name
                })}
              >
                {name}
              </p>
            </div>
            <p className={tooltipStyles.labelValue}>
              {value !== undefined ? value.toLocaleString() : 'n/a'}
            </p>
          </div>
        ) : null
      )}
    {!datum && <div>No data</div>}
  </div>
);

CountryEmploymentTooltip.propTypes = {
  datum: Proptypes.object,
  config: Proptypes.object
};

export default CountryEmploymentTooltip;
