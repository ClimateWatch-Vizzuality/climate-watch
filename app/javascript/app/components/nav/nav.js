import { connect } from 'react-redux';

import Component from './nav-component';
import actions from './nav-actions';

export { initialState } from './nav-reducers';
export { default as reducers } from './nav-reducers';
export { default as actions } from './nav-actions';

const mapStateToProps = state => ({
  countriesOpen: state.nav.countriesOpen
});

export default connect(mapStateToProps, actions)(Component);
