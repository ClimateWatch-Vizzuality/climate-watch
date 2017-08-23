import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Component from './nav-component';
import actions from './nav-actions';

export { default as reducers } from './nav-reducers';
export { default as actions } from './nav-actions';

const mapStateToProps = state => ({
  countriesOpen: state.nav.countriesOpen
});

export default withRouter(connect(mapStateToProps, actions)(Component));
