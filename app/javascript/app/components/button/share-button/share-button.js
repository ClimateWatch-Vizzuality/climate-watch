import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import actions from 'components/modal-share/modal-share-actions';

import Component from './share-button-component';

export default withRouter(connect(null, actions)(Component));
