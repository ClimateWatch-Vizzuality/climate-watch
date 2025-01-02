import React from 'react';

import layout from 'styles/layout';
import styles from './ndcs-enhancements-2025-country-breakdown-styles.scss';

const Ndc2025CountryBreakdownComponent = () => (
  <div className={styles.wrapper}>
    <div className={layout.content}>
      <div className={styles.summary}>
        <div className={styles.summaryHeader}>
          <h2>
            How are countries collectively reducing their emissions for 2035?
          </h2>
        </div>
        <div className={styles.summaryDescription}>
          <p>
            Explore how countries are collectively and individually contributing
            to reduce their emissions by 2035, and find out how far the world is
            from closing the emission gap to reach a 2C or a 1.5C aligned
            future.
          </p>
        </div>
      </div>
    </div>
  </div>
);

Ndc2025CountryBreakdownComponent.propTypes = {};

export default Ndc2025CountryBreakdownComponent;
