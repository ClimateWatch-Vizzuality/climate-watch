import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Component from './ndc-component';
import actions from './ndc-actions';

// export { default as component } from './ndc-component'
export { default as reducers } from './ndc-reducers';
export { default as actions } from './ndc-actions';

export default withRouter(connect(null, actions)(Component));
