import { connect } from 'react-redux';
import { withRouter } from 'react-router';
// import { getAnchorLinks, getRouteLinks } from './emission-pathways-selectors';
import Component from './emission-pathways-component';

// const mapStateToProps = (state, { route, location }) => {
//   const routeData = { route, location, hash: location.hash };
//   return {
//     query: location.search,
//     anchorLinks: getAnchorLinks(routeData),
//     routeLinks: getRouteLinks(routeData)
//   };
// };

export default withRouter(connect(null, null)(Component));
