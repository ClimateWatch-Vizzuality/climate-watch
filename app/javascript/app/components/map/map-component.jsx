import React from 'react';
import Proptypes from 'prop-types';
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography
} from 'components/react-simple-maps';
// TODO: use the library when is updadet with the changes

import styles from './map-styles.scss';

const BasicMap = ({ paths }) =>
  (<div className={styles.wrapper}>
    <ComposableMap
      projection="robinson"
      style={{
        width: '100%',
        height: 'auto'
      }}
    >
      <ZoomableGroup center={[0, 20]} disablePanning>
        <Geographies geographyPaths={paths}>
          {(geographies, projection) =>
            geographies.map(geography =>
              (<Geography
                key={geography.id}
                geography={geography}
                projection={projection}
                style={{
                  default: {
                    fill: '#ECEFF1',
                    stroke: '#607D8B',
                    strokeWidth: 0.75,
                    outline: 'none'
                  },
                  hover: {
                    fill: '#607D8B',
                    stroke: '#607D8B',
                    strokeWidth: 0.75,
                    outline: 'none'
                  },
                  pressed: {
                    fill: '#FF5722',
                    stroke: '#607D8B',
                    strokeWidth: 0.75,
                    outline: 'none'
                  }
                }}
              />)
            )}
        </Geographies>
      </ZoomableGroup>
    </ComposableMap>
  </div>);

BasicMap.propTypes = {
  paths: Proptypes.array.isRequired
};

export default BasicMap;
