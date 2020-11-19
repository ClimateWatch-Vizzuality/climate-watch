import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import mapStateToProps from './about-faq-selectors';
import Component from './about-faq-component';

export default withRouter(connect(mapStateToProps, null)(Component));
