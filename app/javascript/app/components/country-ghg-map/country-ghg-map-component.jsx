import React, { PureComponent } from 'react';
import Map from 'components/map';
import MapFooter from 'components/map-footer';
import PropTypes from 'prop-types';

import styles from './country-ghg-map-styles.scss';

class CountryGhgMap extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const { paths, legend } = this.props;

    return (
      <div className={styles.container}>
        <Map
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
  legend: PropTypes.object.isRequired
};

export default CountryGhgMap;
