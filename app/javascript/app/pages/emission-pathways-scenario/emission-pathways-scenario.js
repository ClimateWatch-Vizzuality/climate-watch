import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {
  getAnchorLinks,
  getRouteLinks,
  getScenario,
  getId
} from './emission-pathways-scenario-selectors';
import Component from './emission-pathways-scenario-component';

const mapStateToProps = (state, { route, location, match }) => {
  const espScenario = {
    route,
    location,
    id: match.params.id,
    scenarioData: state.espScenarios.data,
    hash: location.hash
  };
  return {
    route,
    query: location.search,
    anchorLinks: getAnchorLinks(espScenario),
    routeLinks: getRouteLinks(espScenario),
    scenario: getScenario(espScenario),
    id: getId(espScenario)
  };
};

export default withRouter(connect(mapStateToProps, null)(Component));
