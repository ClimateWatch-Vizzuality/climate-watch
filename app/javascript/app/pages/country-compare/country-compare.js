import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { actions } from 'components/anchor-nav';
import { getAnchorLinks } from './country-compare-selectors';

import Component from './country-compare-component';

const mapStateToProps = (state, { route, location }) => {
  const routerData = { route, location };
  return {
    anchorLinks: getAnchorLinks(routerData),
    query: location.search
  };
};

export default withRouter(connect(mapStateToProps, actions)(Component));
