import { connect } from 'react-redux';
import Component from './ndc-country-component';
import actions from './ndc-country-actions';

// export { default as component } from './ndc-component'
export { default as reducers } from './ndc-country-reducers';
export { default as actions } from './ndc-country-actions';

export default connect(state => state.ndc, actions)(Component);
