import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import Component from './accordion-component';

const mapStateToProps = (state, { location }) => ({
  location
});

export default withRouter(connect(mapStateToProps, null)(Component));
