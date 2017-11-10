import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { getRouteLinks } from './emission-pathways-table-selectors';
import Component from './emission-pathways-table-component';

const mapStateToProps = (state, { location, routes }) => {
  const routeData = {
    routes,
    hash: location && location.hash
  };

  return {
    anchorLinks: getRouteLinks(routeData)
  };
};

export default withRouter(connect(mapStateToProps, null)(Component));
