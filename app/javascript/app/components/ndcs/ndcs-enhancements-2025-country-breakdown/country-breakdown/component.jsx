import React from 'react';

import ButtonGroup from 'components/button-group';

import countryChartPlaceholder from 'assets/placeholders/iconic-country-placeholder.png';

import styles from './styles.scss';

const CountryBreakdownComponent = () => (
  <div className={styles.wrapper}>
    <div className={styles.summaryHeader}>
      <div className={styles.summaryDescription}>
        <p>
          Compare countries' 2030 and 2035 NDC targets to various baseline years
          and evaluate the differences between the two target years.
        </p>
      </div>
      <div className={styles.buttonGroupContainer}>
        <ButtonGroup
          className={styles.buttonGroup}
          buttonsConfig={[
            {
              type: 'info',
              onClick: () => {}
            },
            {
              type: 'share',
              shareUrl: null
            },
            {
              type: 'download',
              options: [
                {
                  label: 'Save as image (PNG)',
                  action: () => {}
                }
              ]
            }
          ]}
        />
      </div>
    </div>
    <div className={styles.chartContainer}>
      <div>Buttons</div>
      <div>
        <img
          className={styles.chartPlaceholderImg}
          src={countryChartPlaceholder}
        />
      </div>
    </div>
  </div>
);

CountryBreakdownComponent.PropTypes = {};

export default CountryBreakdownComponent;
