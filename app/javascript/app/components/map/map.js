import { connect } from 'react-redux';

import Component from './map-component';
import actions from './map-actions';

export { default as reducers } from './map-reducers';
export { default as actions } from './map-actions';

const mapStateToProps = state => ({
  zoom: state.map.zoom,
  center: state.map.center
});

export default connect(mapStateToProps, actions)(Component);
