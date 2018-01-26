import { connect } from 'react-redux';

import HamburgerComponent from './hamburger-component';
import initialState from './hamburger-initial-state';
import * as actions from './hamburger-actions';
import * as reducers from './hamburger-reducers';

const mapStateToProps = ({ hamburger }) => hamburger;

export { actions, reducers, initialState };

export default connect(mapStateToProps, actions)(HamburgerComponent);
