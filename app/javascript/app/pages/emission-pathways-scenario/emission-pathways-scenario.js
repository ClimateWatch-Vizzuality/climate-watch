import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {
  getAnchorLinks,
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
    scenario: getScenario(espScenario),
    id: getId(espScenario)
  };
};

export default withRouter(connect(mapStateToProps, null)(Component));
