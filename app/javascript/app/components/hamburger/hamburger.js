import { connect } from 'react-redux';

import HamburgerComponent from './hamburger-component';
import actions from './hamburger-actions';
import reducers, { initialState } from './hamburger-reducers';

const mapStateToProps = ({ hamburger }) => hamburger;

export { actions, reducers, initialState };

export default connect(mapStateToProps, actions)(HamburgerComponent);
