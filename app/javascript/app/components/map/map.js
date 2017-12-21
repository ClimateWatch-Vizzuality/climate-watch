import { createElement, PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import ReactDOM from 'react-dom';
import ReactTooltip from 'react-tooltip';

import worldPaths from 'app/data/world-50m-paths';

import actions from './map-actions';
import reducers, { initialState } from './map-reducers';

import MapComponent from './map-component';

const ZOOM_STEP = 2;

const mapStateToProps = state => ({
  zoom: state.map.zoom,
  center: state.map.center
});

class MapContainer extends PureComponent {
  constructor() {
    super();
    this.state = { forceUpdate: false };
    this.addGeometryRef = this.addGeometryRef.bind(this);
    this.handleMotionRest = this.handleMotionRest.bind(this);
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

  handleMotionRest() {
    if (this.props.openedTooltipISO) {
      ReactTooltip.show(
        ReactDOM.findDOMNode(this[this.props.openedTooltipISO]) // eslint-disable-line react/no-find-dom-node
      );
    }
  }

  addGeometryRef(id, ref) {
    if (id) this[id] = ref;
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
      handleMotionRest: this.handleMotionRest,
      forceUpdate: this.state.forceUpdate,
      addGeometryRef: this.addGeometryRef,
      ...this.props
    });
  }
}

MapContainer.propTypes = {
  paths: PropTypes.array,
  zoom: PropTypes.number.isRequired,
  setMapZoom: PropTypes.func.isRequired,
  setMapParams: PropTypes.func.isRequired,
  openedTooltipISO: PropTypes.string
};

export { actions, reducers, initialState };

export default connect(mapStateToProps, actions)(MapContainer);
