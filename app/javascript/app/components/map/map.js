import { createElement, PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';

import worldPaths from 'app/data/world-50m-paths';

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
  constructor() {
    super();
    this.state = { forceUpdate: false };
  }

  componentWillReceiveProps(nextProps) {
    this.state.forceUpdate = !isEqual(nextProps.paths, this.props.paths);
  }

  componentDidUpdate() {
    if (this.state.forceUpdate) {
      // Not a good practice but I want to force a rerender
      // because setting the map cache improve performance a lot!
      this.setState({ forceUpdate: false }); // eslint-disable-line
    }
  }

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
      paths: worldPaths,
      handleZoomIn: this.handleZoomIn,
      handleZoomOut: this.handleZoomOut,
      forceUpdate: this.state.forceUpdate,
      ...this.props
    });
  }
}

MapContainer.propTypes = {
  paths: PropTypes.array,
  zoom: PropTypes.number.isRequired,
  setMapZoom: PropTypes.func.isRequired,
  setMapParams: PropTypes.func.isRequired
};

export default connect(mapStateToProps, actions)(MapContainer);
