import { connect } from 'react-redux';

import actions from './geolocation-provider-actions';
import Component from './geolocation-provider-component';

export { initialState } from './geolocation-provider-reducers';
export { default as reducers } from './geolocation-provider-reducers';
export { default as actions } from './geolocation-provider-actions';

export default connect(null, actions)(Component);
