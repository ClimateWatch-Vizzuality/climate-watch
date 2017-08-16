import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import Component from './accordion-component';

const mapStateToProps = (state, { location, match }) => ({
  location,
  data: state.ndc.data[match.params.iso]
});

export default withRouter(connect(mapStateToProps, null)(Component));
