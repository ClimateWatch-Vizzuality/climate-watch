import React from 'react';
import PropTypes from 'prop-types';
import Map from 'components/map';
import styles from './ndcs-search-map-styles.scss';

const NDCSearchMap = props => (
  <div className={styles.wrapper}>
    <Map
      cache={false}
      paths={props.paths}
      onCountryClick={props.handleCountryClick}
    />
  </div>
);

NDCSearchMap.propTypes = {
  paths: PropTypes.array.isRequired,
  handleCountryClick: PropTypes.func.isRequired
};

export default NDCSearchMap;
