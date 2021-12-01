import React from 'react';
import PropTypes from 'prop-types';
import CountryProfileIndicatorsProvider from 'providers/country-profile-indicators-provider';
import styles from './country-subnational-actions-styles.scss';

function CountryClimateCommitments({ iso }) {
  return (
    <div className={styles.gridContainer}>
      <div className={styles.grid}>
        <div className={styles.container}>
          <h3 className={styles.title}>Subnational Actions</h3>
        </div>
        <CountryProfileIndicatorsProvider
          indicatorSlugs={[
            'city_badge_type',
            'city_commited',
            'company_commited',
            'company_target'
          ]}
          locations={[iso]}
        />
      </div>
    </div>
  );
}

CountryClimateCommitments.propTypes = {
  iso: PropTypes.string.isRequired
};

export default CountryClimateCommitments;
