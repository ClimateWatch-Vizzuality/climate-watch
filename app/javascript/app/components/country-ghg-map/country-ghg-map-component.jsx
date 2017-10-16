import React, { PureComponent } from 'react';
import Map from 'components/map';
import MapFooter from 'components/map-footer';
import PropTypes from 'prop-types';

import styles from './country-ghg-map-styles.scss';

class CountryGhgMap extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const { paths, forceUpdate, legend } = this.props;

    return (
      <div className={styles.container}>
        <Map
          cache={!forceUpdate}
          style={{ height: '100%', width: '100%' }}
          zoomEnable
          paths={paths}
          className={styles.map}
        />
        <MapFooter data={legend} />
      </div>
    );
  }
}

CountryGhgMap.propTypes = {
  paths: PropTypes.array.isRequired,
  forceUpdate: PropTypes.bool,
  legend: PropTypes.object.isRequired
};

export default CountryGhgMap;
