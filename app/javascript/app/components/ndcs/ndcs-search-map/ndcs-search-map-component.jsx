import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Map from 'components/map';
import styles from './ndcs-search-map-styles.scss';

const NDCSearchMap = props => (
  <div className={styles.mapWrapper}>
    {!props.loading && (
      <div className={styles.countriesCount}>
        {props.countriesIncluded.length && (
          <Fragment>
            <span className={styles.includedCountriesCount}>
              {props.countriesIncluded.length}
            </span>
            {` of ${props.totalCountriesNumber ||
              'all'} countries mention this`}
          </Fragment>
        )}
      </div>
    )}
    <Map
      cache={false}
      paths={props.paths}
      onCountryClick={props.handleCountryClick}
      customCenter={[20, -30]}
    />
  </div>
);

NDCSearchMap.propTypes = {
  paths: PropTypes.array.isRequired,
  totalCountriesNumber: PropTypes.number,
  countriesIncluded: PropTypes.array,
  loading: PropTypes.bool,
  handleCountryClick: PropTypes.func.isRequired
};

export default NDCSearchMap;
