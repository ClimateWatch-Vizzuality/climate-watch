import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import Component from './ndcs-enhancements-2025-component';
import { getAnchorLinks } from './ndcs-enhancements-2025-selectors';

const mapStateToProps = (state, { route, location }) => ({
  anchorLinks: getAnchorLinks(route),
  query: location.search
});

export default withRouter(connect(mapStateToProps, null)(Component));
