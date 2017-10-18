import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Map from 'components/map';
import LegendRange from './legend-range';
import LegendSteps from './legend-steps';

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
        {this.props.targetHover ? (
          <LegendSteps className={styles.legend} />
        ) : (
          <LegendRange className={styles.legend} />
        )}
      </div>
    );
  }
}

NdcSdgLinkagesMap.propTypes = {
  paths: PropTypes.array.isRequired,
  targetHover: PropTypes.string
};

export default NdcSdgLinkagesMap;
