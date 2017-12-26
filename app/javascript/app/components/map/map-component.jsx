import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography
} from 'react-simple-maps';
import ReactTooltip from 'react-tooltip';
import { Motion, spring } from 'react-motion';
import Button from 'components/button';
import Icon from 'components/icon';
import mapZoomIn from 'assets/icons/map-zoom-in.svg';
import mapZoomOut from 'assets/icons/map-zoom-out.svg';

import styles from './map-styles.scss';

class Map extends PureComponent {
  render() {
    const { zoom, center, customCenter } = this.props;
    const { className } = this.props;
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
      countryNameTooltip,
      onCountryClick,
      onCountryMove,
      onCountryEnter,
      onCountryLeave,
      defaultStyle,
      controlPosition
    } = this.props;
    return (
      <div className={cx(styles.wrapper, className)}>
        {zoomEnable && (
          <div
            className={cx(styles.actions, {
              [styles.bottom]: controlPosition === 'bottom'
            })}
          >
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
            x: 20,
            y: 10
          }}
          style={{
            z: spring(zoom, { stiffness: 240, damping: 30 }),
            x: spring((customCenter && customCenter[0]) || center[0], {
              stiffness: 240,
              damping: 30
            }),
            y: spring((customCenter && customCenter[1]) || center[1], {
              stiffness: 240,
              damping: 30
            })
          }}
        >
          {({ z, x, y }) => (
            <ComposableMap projection="robinson" style={style}>
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
                          key: geography.properties && geography.properties.id,
                          geography,
                          projection,
                          onClick: onCountryClick,
                          onMouseMove: onCountryMove,
                          onMouseEnter: onCountryEnter,
                          onMouseLeave: onCountryLeave,
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
        {countryNameTooltip && <ReactTooltip id="namesTooltip" />}
      </div>
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
  paths: PropTypes.array.isRequired,
  tooltipId: PropTypes.string,
  countryNameTooltip: PropTypes.bool.isRequired,
  handleZoomIn: PropTypes.func.isRequired,
  handleZoomOut: PropTypes.func.isRequired,
  onCountryEnter: PropTypes.func,
  onCountryClick: PropTypes.func,
  onCountryMove: PropTypes.func,
  onCountryLeave: PropTypes.func,
  controlPosition: PropTypes.string,
  defaultStyle: PropTypes.object.isRequired
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
  }
};

export default Map;
