import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Map from 'components/map';
import newMapTheme from 'styles/themes/map/map-new-zoom-controls.scss';
import styles from './ndcs-search-map-styles.scss';

const NDCSearchMap = props => (
  <div className={styles.mapWrapper}>
    {!props.loading && (
      <div className={styles.countriesCount}>
        {props.includedDocumentsNumber && props.includedDocumentsNumber > 0 ? (
          <Fragment>
            <span className={styles.includedCountriesCount}>
              {props.includedDocumentsNumber || '-'}
            </span>
            {` of ${props.totalDocumentsNumber || '-'}
             documents representing
            ${props.includedCountriesNumber || '-'}
            of ${props.totalCountriesNumber || '-'}
             parties to the UNFCCC mention this`}
          </Fragment>
        ) : null}
      </div>
    )}
    <Map
      cache={false}
      paths={props.paths}
      onCountryClick={props.handleCountryClick}
      customCenter={[20, -30]}
      zoomEnable
      theme={newMapTheme}
    />
  </div>
);

NDCSearchMap.propTypes = {
  paths: PropTypes.array.isRequired,
  totalDocumentsNumber: PropTypes.number,
  totalCountriesNumber: PropTypes.number,
  includedDocumentsNumber: PropTypes.number,
  includedCountriesNumber: PropTypes.number,
  loading: PropTypes.bool,
  handleCountryClick: PropTypes.func.isRequired
};

export default NDCSearchMap;
