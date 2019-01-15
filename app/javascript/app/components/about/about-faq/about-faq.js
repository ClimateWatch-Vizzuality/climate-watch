import { connect } from 'react-redux';
import mapStateToProps from './about-faq-selectors';
import Component from './about-faq-component';

export default connect(mapStateToProps, null)(Component);
