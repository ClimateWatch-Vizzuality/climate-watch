import { connect } from 'react-redux';
import { withHandlers } from 'recompose';
import actions from './modal-download-actions';
import { USERS_PROFESIONAL_SECTORS as sectors } from 'data/constants';
import reducers, { initialState } from './modal-download-reducers';

import Component from './modal-download-component';

import { countriesSelector, sectorsSelector } from './modal-download-selectors';

const SPREADSHEET_URL =
  'https://script.google.com/macros/s/AKfycbynUpTR6EHAcGwfgaI26U3jFH4WKaPNTsR8qZBkSwNs7OCh7TJF/exec';

const mapStateToProps = ({ modalDownload, countries }) => ({
  isOpen: modalDownload.isOpen,
  downloadUrl: modalDownload.downloadUrl,
  downloadSize: modalDownload.downloadSize,
  countries: countriesSelector({ countries }),
  sectors: sectorsSelector({ sectors }),
  isSubmitting: false,
  firstName: modalDownload.firstName
});

const includeActions = withHandlers({
  onRequestClose: props => () => {
    props.toggleModalDownload({ open: false });
  },

  onSubmit: props => event => {
    console.log(event);

    // const params = Object.keys(payload).map(
    //   key => `${key}=${encodeURIComponent(payload[key])}`
    // );

    // this.setState({ isSubmitting: true });

    // fetch(`${SPREADSHEET_URL}?${params.join('&')}`)
    //   .then(() => window.location.assign(this.props.downloadUrl))
    //   .finally(() => this.setState({ isSubmitting: false }));
  }
});

export { actions, reducers, initialState };

export default connect(mapStateToProps, actions)(includeActions(Component));
