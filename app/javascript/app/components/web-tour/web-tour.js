import { connect } from 'react-redux';
import Component from './web-tour-component';
import actions from './web-tour-actions';
import reducers, { initialState } from './web-tour-reducers';

const getStateProps = state => ({
  isOpen: state.tour.isOpen
});

export { actions, reducers, initialState };
export default connect(getStateProps, actions)(Component);
