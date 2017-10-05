import React, { PureComponent } from 'react';
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
import Icon from 'components/icon';
import mapZoomIn from 'assets/icons/map-zoom-in.svg';
import mapZoomOut from 'assets/icons/map-zoom-out.svg';

import styles from './map-styles.scss';

class Map extends PureComponent {
  render() {
    const { zoom, center } = this.props;
    const { className } = this.props;
    const {
      paths,
      cache,
      zoomEnable,
      dragEnable,
      tooltipId,
      handleZoomIn,
      handleZoomOut,
      onCountryClick,
      onCountryMove,
      onCountryEnter,
      onCountryLeave,
      defaultStyle
    } = this.props;
    return (
      <div className={cx(styles.wrapper, className)}>
        {zoomEnable && (
          <div className={styles.actions}>
            <Button onClick={handleZoomIn}>
              <Icon icon={mapZoomIn} />
            </Button>
            <Button disabled={zoom === 1} onClick={handleZoomOut}>
              <Icon icon={mapZoomOut} />
            </Button>
          </div>
        )}
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
          {({ z, x, y }) => (
            <ComposableMap
              projection="robinson"
              style={{
                width: '100%'
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
                    geographies.map(geography => {
                      if (geography) {
                        let commonProps = {
                          key: geography.id,
                          geography,
                          projection,
                          onClick: onCountryClick,
                          onMouseMove: onCountryMove,
                          onMouseEnter: onCountryEnter,
                          onMouseLeave: onCountryLeave,
                          style: geography.style || defaultStyle
                        };
                        if (tooltipId) {
                          commonProps = {
                            ...commonProps,
                            'data-tip': '',
                            'data-for': tooltipId
                          };
                        }
                        return <Geography {...commonProps} />;
                      }
                      return null;
                    })}
                </Geographies>
              </ZoomableGroup>
            </ComposableMap>
          )}
        </Motion>
      </div>
    );
  }
}

Map.propTypes = {
  center: Proptypes.array.isRequired,
  zoom: Proptypes.number.isRequired,
  zoomEnable: Proptypes.bool,
  dragEnable: Proptypes.bool,
  cache: Proptypes.bool,
  className: Proptypes.string,
  paths: Proptypes.array.isRequired,
  tooltipId: Proptypes.string,
  handleZoomIn: Proptypes.func.isRequired,
  handleZoomOut: Proptypes.func.isRequired,
  onCountryEnter: Proptypes.func,
  onCountryClick: Proptypes.func,
  onCountryMove: Proptypes.func,
  onCountryLeave: Proptypes.func,
  defaultStyle: Proptypes.object.isRequired
};

Map.defaultProps = {
  center: [0, 20],
  zoom: 1,
  zoomEnable: false,
  dragEnable: true,
  cache: true,
  paths: [],
  tooltipId: '',
  onCountryClick: () => {},
  onCountryEnter: () => {},
  onCountryMove: () => {},
  onCountryLeave: () => {},
  defaultStyle: {
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
  }
};

export default Map;
