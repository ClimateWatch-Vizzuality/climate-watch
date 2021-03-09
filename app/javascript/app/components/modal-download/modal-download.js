import { connect } from 'react-redux';
import { withHandlers } from 'recompose';
import { USERS_PROFESIONAL_SECTORS as sectors } from 'data/constants';
import actions from './modal-download-actions';
import reducers, { initialState } from './modal-download-reducers';

import Component from './modal-download-component';

import { countriesSelector, sectorsSelector } from './modal-download-selectors';

const mapStateToProps = ({ modalDownload, countries }) => ({
  isOpen: modalDownload.isOpen,
  downloadSize: modalDownload.downloadSize,
  countries: countriesSelector({ countries }),
  sectors: sectorsSelector({ sectors }),
  requiredError: modalDownload.requiredError,
  errorMessage: modalDownload.errorMessage,
  processing: modalDownload.processing
});

const includeActions = withHandlers({
  onRequestClose: props => () => {
    props.toggleModalDownload({ open: false });
  },

  onSubmit: ({ setRequiredFieldsError, saveSurveyData }) => internalState => {
    setRequiredFieldsError(internalState);
    saveSurveyData(internalState);
  }
});

export { actions, reducers, initialState };

export default connect(mapStateToProps, actions)(includeActions(Component));
