import { connect } from 'react-redux';
import { actions } from 'components/hamburger';
import { withRouter } from 'react-router';
import Component from './tools-nav-component';

export default withRouter(connect(null, actions)(Component));
