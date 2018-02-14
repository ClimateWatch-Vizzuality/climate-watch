import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getAnchorLinks } from './country-compare-selectors';

import Component from './country-compare-component';

const mapStateToProps = (state, { route, location }) => ({
  anchorLinks: getAnchorLinks(route),
  query: location.search
});

export default withRouter(connect(mapStateToProps, null)(Component));
