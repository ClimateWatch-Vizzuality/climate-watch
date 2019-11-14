import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Markers,
  Marker
} from 'react-simple-maps';
import ReactTooltip from 'react-tooltip';
import { Motion, spring } from 'react-motion';

import { TabletLandscape } from 'components/responsive';
import Button from 'components/button';
import Icon from 'components/icon';
import mapZoomIn from 'assets/icons/map-zoom-in.svg';
import mapZoomOut from 'assets/icons/map-zoom-out.svg';

import styles from './map-styles.scss';

class Map extends PureComponent {
  render() {
    const { zoom, center, customCenter } = this.props;
    const { className, theme } = this.props;
    const {
      forceUpdate,
      paths,
      cache,
      style,
      zoomEnable,
      dragEnable,
      tooltipId,
      handleZoomIn,
      handleZoomOut,
      handleMarkerClick,
      countryNameTooltip,
      onCountryClick,
      onCountryMove,
      onCountryEnter,
      onCountryLeave,
      onCountryFocus,
      onCountryBlur,
      defaultStyle,
      controlPosition,
      markers
    } = this.props;
    const getMotionStyle = () => {
      const xCenter = (customCenter && customCenter[0]) || center[0];
      const yCenter = (customCenter && customCenter[1]) || center[1];
      return {
        z: spring(zoom, { stiffness: 240, damping: 30 }),
        x: spring(xCenter, {
          stiffness: 240,
          damping: 30
        }),
        y: spring(yCenter, {
          stiffness: 240,
          damping: 30
        })
      };
    };

    const renderMarkers = () => (
      <Markers>
        {markers.map(marker => (
          <Marker key={marker.name} marker={marker} onClick={handleMarkerClick}>
            <rect
              id="svgCircle"
              width={20}
              height={20}
              x={-6}
              y={-5}
              rx={10}
              ry={10}
              style={{
                fill: '#0D384E',
                opacity: 1
              }}
            />
            <rect
              id="svgRectangle"
              width={147}
              height={20}
              x={-135}
              y={-5}
              rx={10}
              ry={10}
              style={{
                fill: '#0D384E',
                opacity: 0
              }}
            />
            <text
              id="platformName"
              textAnchor="middle"
              x={-62}
              y={8.5}
              style={{
                fontFamily: 'Lato, sans-serif',
                fontSize: 12,
                fill: '#fff',
                stroke: 'none',
                opacity: 0
              }}
            >
              {marker.name}
            </text>
            {marker.pin}
          </Marker>
        ))}
      </Markers>
    );

    return (
      <TabletLandscape>
        {matches => (
          <div
            className={cx(styles.wrapper, className, {
              [styles.notDraggable]: !dragEnable
            })}
          >
            {zoomEnable && (
              <div
                className={cx(
                  styles.actions,
                  {
                    [styles.bottom]: controlPosition === 'bottom'
                  },
                  theme.actions
                )}
              >
                <Button title="map zoom in" onClick={handleZoomIn}>
                  <Icon icon={mapZoomIn} />
                </Button>
                <Button
                  title="map zoom out"
                  disabled={zoom === 1}
                  onClick={handleZoomOut}
                >
                  <Icon icon={mapZoomOut} />
                </Button>
              </div>
            )}
            <Motion
              defaultStyle={{
                z: 1,
                x: 20,
                y: 10
              }}
              style={getMotionStyle()}
            >
              {({ z, x, y }) => (
                <ComposableMap
                  projection="robinson"
                  projectionConfig={{
                    scale: 145,
                    rotation: [0, 0, 0]
                  }}
                  style={style}
                >
                  <ZoomableGroup
                    center={customCenter || [x, y]}
                    zoom={z}
                    disablePanning={!dragEnable}
                  >
                    <Geographies
                      geographyPaths={paths}
                      disableOptimization={forceUpdate || !cache}
                    >
                      {(geographies, projection) =>
                        geographies.map(geography => {
                          if (geography) {
                            let commonProps = {
                              key:
                                geography.properties && geography.properties.id,
                              geography,
                              projection,
                              onClick: onCountryClick,
                              onMouseMove: onCountryMove,
                              onMouseEnter: onCountryEnter,
                              onMouseLeave: onCountryLeave,
                              onFocus: onCountryFocus,
                              onBlur: onCountryBlur,
                              style: geography.style || defaultStyle
                            };
                            if (countryNameTooltip) {
                              commonProps = {
                                ...commonProps,
                                'data-tip': geography.properties.name,
                                'data-for': 'namesTooltip'
                              };
                            }
                            if (tooltipId) {
                              commonProps = {
                                ...commonProps,
                                'data-tip': '',
                                'data-for': tooltipId
                              };
                              if (!matches) {
                                commonProps = {
                                  ...commonProps,
                                  'data-event': 'click',
                                  'data-event-off': 'click'
                                };
                              }
                            }
                            return <Geography {...commonProps} />;
                          }
                          return null;
                        })
                      }
                    </Geographies>
                    {markers && markers.length && renderMarkers()}
                  </ZoomableGroup>
                </ComposableMap>
              )}
            </Motion>
            {countryNameTooltip && <ReactTooltip id="namesTooltip" />}
          </div>
        )}
      </TabletLandscape>
    );
  }
}

Map.propTypes = {
  style: PropTypes.object.isRequired,
  center: PropTypes.array.isRequired,
  customCenter: PropTypes.array,
  zoom: PropTypes.number.isRequired,
  zoomEnable: PropTypes.bool,
  dragEnable: PropTypes.bool,
  forceUpdate: PropTypes.bool,
  cache: PropTypes.bool,
  className: PropTypes.string,
  theme: PropTypes.object,
  paths: PropTypes.array.isRequired,
  tooltipId: PropTypes.string,
  countryNameTooltip: PropTypes.bool.isRequired,
  handleZoomIn: PropTypes.func,
  handleZoomOut: PropTypes.func,
  handleMarkerClick: PropTypes.func,
  onCountryEnter: PropTypes.func,
  onCountryClick: PropTypes.func,
  onCountryMove: PropTypes.func,
  onCountryLeave: PropTypes.func,
  onCountryFocus: PropTypes.func,
  onCountryBlur: PropTypes.func,
  controlPosition: PropTypes.string,
  defaultStyle: PropTypes.object.isRequired,
  markers: PropTypes.array
};

Map.defaultProps = {
  style: {
    width: '100%'
  },
  center: [20, 10],
  zoom: 1,
  zoomEnable: false,
  dragEnable: true,
  forceUpdate: false,
  cache: true,
  paths: [],
  tooltipId: '',
  countryNameTooltip: true,
  onCountryClick: () => {},
  onCountryEnter: () => {},
  onCountryMove: () => {},
  onCountryLeave: () => {},
  handleMarkerClick: () => {},
  markers: [],
  defaultStyle: {
    default: {
      fill: '#E5E5EB',
      stroke: '#000',
      strokeWidth: 0.05,
      outline: 'none'
    },
    hover: {
      fill: '#E5E5EB',
      stroke: '#000',
      strokeWidth: 0.05,
      outline: 'none'
    },
    pressed: {
      fill: '#E5E5EB',
      stroke: '#000',
      strokeWidth: 0.5,
      outline: 'none'
    }
  },
  theme: {}
};

export default Map;
