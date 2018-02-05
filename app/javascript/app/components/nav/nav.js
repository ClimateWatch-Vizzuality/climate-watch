import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import { actions } from 'components/hamburger';

import Component from './nav-component';

export default withRouter(connect(null, actions)(Component));
