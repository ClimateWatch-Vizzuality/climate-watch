import { connect } from 'react-redux';
import { withHandlers } from 'recompose';
import actions from './modal-overview-actions';
import reducers, { initialState } from './modal-overview-reducers';

import Component from './modal-overview-component';

const mapStateToProps = ({ modalESPOverview }) => ({
  isOpen: modalESPOverview.isOpen
});

const includeActions = withHandlers({
  onRequestClose: props => () => {
    props.toggleModalOverview({ open: false });
  }
});

export { actions, reducers, initialState };

export default connect(mapStateToProps, actions)(includeActions(Component));
