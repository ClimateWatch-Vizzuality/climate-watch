import React from 'react';
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography
} from 'react-simple-maps';

import styles from './map-styles.scss';

// import { feature } from 'topojson-client';
// import topojson from '../../data/world-50m.json';
// const paths = feature(topojson, topojson.objects[Object.keys(topojson.objects)[0]]).features;
// console.log(paths);

const BasicMap = () =>
  (<div className={styles.wrapper}>
    <ComposableMap
      projectionConfig={{
        scale: 205,
        rotation: [-11, 0, 0]
      }}
      style={{
        width: '100%',
        height: 'auto'
      }}
    >
      <ZoomableGroup center={[0, 20]} disablePanning>
        <Geographies geographyUrl="/data/world-50m.json">
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

export default BasicMap;
