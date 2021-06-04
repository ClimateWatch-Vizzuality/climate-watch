import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import reducers, { initialState } from './web-tour-reducers';
import actions from './web-tour-actions';
import Component from './web-tour-component';

const getStateProps = state => ({
  slug: state.tour.slug,
  isOpen: state.tour.isOpen
});

export { actions, reducers, initialState };
export default withRouter(connect(getStateProps, actions)(Component));
