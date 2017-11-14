import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {
  getAnchorLinks,
  getRouteLinks,
  getModel,
  getOverviewData
} from './emission-pathways-model-selectors';
import Component from './emission-pathways-model-component';

const mapStateToProps = (state, { route, location, match }) => {
  const espModel = {
    route,
    location,
    id: match.params.id,
    modelData: state.espModels,
    hash: location.hash
  };
  return {
    query: location.search,
    anchorLinks: getAnchorLinks(espModel),
    routeLinks: getRouteLinks(espModel),
    model: getModel(espModel),
    overviewData: getOverviewData(espModel)
  };
};

export default withRouter(connect(mapStateToProps, null)(Component));
