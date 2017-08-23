import { createElement } from 'react';
import { connect } from 'react-redux';

import MapComponent from './map-component';
import actions from './map-actions';

export { initialState } from './map-reducers';
export { default as reducers } from './map-reducers';
export { default as actions } from './map-actions';

const ZOOM_STEP = 2;

const mapStateToProps = state => ({
  zoom: state.map.zoom,
  center: state.map.center
});

const MapContainer = (props) => {
  const handleZoomIn = () => {
    const zoom = props.zoom * ZOOM_STEP;
    props.setMapZoom(zoom);
  };

  const handleZoomOut = () => {
    const zoom = props.zoom / ZOOM_STEP;
    props.setMapZoom(zoom);
  };
  return createElement(MapComponent, {
    ...props,
    handleZoomIn,
    handleZoomOut
  });
};

export default connect(mapStateToProps, actions)(MapContainer);
