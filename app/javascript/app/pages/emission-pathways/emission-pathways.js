import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getAnchorLinks } from './emission-pathways-selectors';
import Component from './emission-pathways-component';

const mapStateToProps = (state, { route, location }) => ({
  query: location.search,
  anchorLinks: getAnchorLinks({ route, location })
});

export default withRouter(connect(mapStateToProps, null)(Component));
