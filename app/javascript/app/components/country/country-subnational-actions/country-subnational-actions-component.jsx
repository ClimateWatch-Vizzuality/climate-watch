import React from 'react';
// import PropTypes from 'prop-types';
import NDCSProvider from 'providers/ndcs-provider';
import { INDICATOR_SLUGS } from 'data/constants';
import styles from './country-subnational-actions-styles.scss';

function CountryClimateCommitments() {
  return (
    <div className={styles.gridContainer}>
      <div className={styles.grid}>
        <div className={styles.container}>
          <h3 className={styles.title}>Subnational Actions</h3>
        </div>
        <NDCSProvider
          overrideFilter
          indicatorSlugs={['nz_status', INDICATOR_SLUGS.enhancements]}
        />
      </div>
    </div>
  );
}

CountryClimateCommitments.propTypes = {};

export default CountryClimateCommitments;
