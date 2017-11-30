import { connect } from 'react-redux';
import Component from './countries-menu-component';
import actions from './countries-menu-actions';
import reducers, { initialState } from './countries-menu-reducers';

const mapStateToProps = state => ({ open: state.countriesMenu.open || false });

export { actions, reducers, initialState };
export default connect(mapStateToProps, actions)(Component);
