import { connect } from 'react-redux';

import initialState from './nav-enhanced-menu-initial-state';
import * as actions from './nav-enhanced-menu-actions';
import * as reducers from './nav-enhanced-menu-reducers';

import NavNestedMenuComponent from './nav-enhanced-menu-component';

const mapStateToProps = ({ navEnhancedMenu }) => navEnhancedMenu;
export { actions, reducers, initialState };
export default connect(mapStateToProps, actions)(NavNestedMenuComponent);
