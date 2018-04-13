import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getAnchorLinks } from './country-compare-selectors';

import Component from './country-compare-component';

const mapStateToProps = (state, { route, location, isContained }) => {
  const routerData = { route, location, isContained };
  return {
    anchorLinks: getAnchorLinks(routerData),
    query: location.search,
    isContained
  };
};

export default withRouter(connect(mapStateToProps, null)(Component));
