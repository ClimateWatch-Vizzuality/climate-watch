import React, { Component } from 'react';
import Proptypes from 'prop-types';
import cx from 'classnames';
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography
} from 'react-simple-maps';
import { Motion, spring } from 'react-motion';
import Button from 'components/button';

import styles from './map-styles.scss';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: props.initial.center,
      zoom: props.initial.zoom
    };
    this.handleZoomIn = this.handleZoomIn.bind(this);
    this.handleZoomOut = this.handleZoomOut.bind(this);
  }

  handleZoomIn() {
    this.setState({
      zoom: this.state.zoom * 2
    });
  }

  handleZoomOut() {
    const { zoom } = this.state;
    if (zoom > 1) {
      this.setState({
        zoom: zoom / 2
      });
    }
  }

  render() {
    const { zoom, center } = this.state;
    const { className } = this.props;
    const {
      paths,
      cache,
      zoomEnable,
      dragEnable,
      onCountryClick,
      computedStyles
    } = this.props;
    return (
      <div className={cx(styles.wrapper, className)}>
        {zoomEnable &&
          <div className={styles.actions}>
            <Button onClick={this.handleZoomIn}>+</Button>
            <Button disabled={zoom === 1} onClick={this.handleZoomOut}>
              -
            </Button>
          </div>}
        <Motion
          defaultStyle={{
            z: 1,
            x: 0,
            y: 20
          }}
          style={{
            z: spring(zoom, { stiffness: 240, damping: 30 }),
            x: spring(center[0], { stiffness: 240, damping: 30 }),
            y: spring(center[1], { stiffness: 240, damping: 30 })
          }}
        >
          {({ z, x, y }) =>
            (<ComposableMap
              projection="robinson"
              style={{
                width: '100%',
                height: 'auto'
              }}
            >
              <ZoomableGroup
                center={[x, y]}
                zoom={z}
                disablePanning={!dragEnable}
              >
                <Geographies
                  geographyPaths={paths}
                  disableOptimization={!cache}
                >
                  {(geographies, projection) =>
                    geographies.map(geography =>
                      (<Geography
                        key={geography.id}
                        geography={geography}
                        projection={projection}
                        onClick={onCountryClick}
                        style={computedStyles(geography)}
                      />)
                    )}
                </Geographies>
              </ZoomableGroup>
            </ComposableMap>)}
        </Motion>
      </div>
    );
  }
}

Map.propTypes = {
  zoomEnable: Proptypes.bool,
  dragEnable: Proptypes.bool,
  cache: Proptypes.bool,
  initial: Proptypes.shape({
    center: Proptypes.array,
    zoom: Proptypes.number
  }),
  className: Proptypes.string,
  paths: Proptypes.array.isRequired,
  onCountryClick: Proptypes.func,
  computedStyles: Proptypes.func.isRequired
};

Map.defaultProps = {
  zoomEnable: false,
  dragEnable: true,
  cache: true,
  initial: {
    center: [0, 20],
    zoom: 1
  },
  paths: [],
  onCountryClick: (country) => {
    console.info('clicked', country);
  },
  // gets the geography data to handle styles individually
  // eslint-disable-next-line
  computedStyles: geography => ({
    default: {
      fill: '#ECEFF1',
      stroke: '#607D8B',
      strokeWidth: 0.75,
      outline: 'none'
    },
    hover: {
      fill: '#302463',
      stroke: '#607D8B',
      strokeWidth: 0.75,
      outline: 'none'
    },
    pressed: {
      fill: '#FF5722',
      stroke: '#607D8B',
      strokeWidth: 1,
      outline: 'none'
    }
  })
};

export default Map;
