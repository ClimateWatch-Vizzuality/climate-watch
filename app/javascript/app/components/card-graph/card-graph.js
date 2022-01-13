import { connect } from 'react-redux';
import { actions } from 'components/modal-metadata';

import Component from './card-graph-component';

export default connect(null, actions)(Component);
