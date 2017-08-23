import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Component from './ndc-component';

export default withRouter(connect(null)(Component));
