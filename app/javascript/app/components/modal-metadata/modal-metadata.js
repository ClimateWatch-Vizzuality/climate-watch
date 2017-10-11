import { connect } from 'react-redux';
import { withHandlers } from 'recompose';

import ModalMetadataComponent from './modal-metadata-component';
import actions from './modal-metadata-actions';
import { getModalTitle, getModalData } from './modal-metadata-selectors';

const mapStateToProps = ({ modalMetadata }) => ({
  isOpen: modalMetadata.isOpen,
  loading: modalMetadata.loading,
  title: getModalTitle(modalMetadata),
  data: getModalData(modalMetadata)
});

export { default as component } from './modal-metadata-component';
export { initialState } from './modal-metadata-reducers';
export { default as reducers } from './modal-metadata-reducers';
export { default as styles } from './modal-metadata-styles';
export { default as actions } from './modal-metadata-actions';

const includeActions = withHandlers({
  onRequestClose: props => () => {
    props.setModalMetadata({ open: false });
  }
});

export default connect(mapStateToProps, actions)(
  includeActions(ModalMetadataComponent)
);
