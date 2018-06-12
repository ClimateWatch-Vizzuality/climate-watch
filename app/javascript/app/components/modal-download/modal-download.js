import { connect } from 'react-redux';
import { withHandlers } from 'recompose';
import actions from './modal-download-actions';
import reducers, { initialState } from './modal-download-reducers';

import Component from './modal-download-component';

const mapStateToProps = ({ modalDownload }) => ({
  isOpen: modalDownload.isOpen,
  downloadUrl: modalDownload.downloadUrl,
  size: modalDownload.size
});

const includeActions = withHandlers({
  onRequestClose: props => () => {
    props.toggleModalDownload({ open: false });
  }
});

export { actions, reducers, initialState };

export default connect(mapStateToProps, actions)(includeActions(Component));
