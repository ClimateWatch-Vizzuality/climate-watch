import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import Component from './accordion-component';

const mapStateToProps = (state, { match }) => ({
  data: state.countryNDC.data[match.params.iso]
});

export default withRouter(connect(mapStateToProps, null)(Component));
