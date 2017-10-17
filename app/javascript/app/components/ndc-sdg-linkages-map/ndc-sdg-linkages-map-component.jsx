import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Map from 'components/map';
import MapRange from 'components/map-range';

import styles from './ndc-sdg-linkages-map-styles.scss';

class NdcSdgLinkagesMap extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className={styles.container}>
        <Map
          style={{ height: '100%', width: '100%' }}
          zoomEnable
          paths={this.props.paths}
          className={styles.map}
        />
        <MapRange className={styles.legend} />
      </div>
    );
  }
}

NdcSdgLinkagesMap.propTypes = {
  paths: PropTypes.array.isRequired
};

export default NdcSdgLinkagesMap;
