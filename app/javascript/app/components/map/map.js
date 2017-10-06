import { createElement, PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import MapComponent from './map-component';
import actions from './map-actions';
import { initialState } from './map-reducers';

export { initialState } from './map-reducers';
export { default as reducers } from './map-reducers';
export { default as actions } from './map-actions';

const ZOOM_STEP = 2;

const mapStateToProps = state => ({
  zoom: state.map.zoom,
  center: state.map.center
});

class MapContainer extends PureComponent {
  componentWillUnmount() {
    this.props.setMapParams(initialState);
  }

  handleZoomIn = () => {
    const zoom = this.props.zoom * ZOOM_STEP;
    this.props.setMapZoom(zoom);
  };

  handleZoomOut = () => {
    const zoom = this.props.zoom / ZOOM_STEP;
    this.props.setMapZoom(zoom);
  };

  render() {
    return createElement(MapComponent, {
      ...this.props,
      handleZoomIn: this.handleZoomIn,
      handleZoomOut: this.handleZoomOut
    });
  }
}

MapContainer.propTypes = {
  zoom: PropTypes.number.isRequired,
  setMapZoom: PropTypes.func.isRequired,
  setMapParams: PropTypes.func.isRequired
};

export default connect(mapStateToProps, actions)(MapContainer);
