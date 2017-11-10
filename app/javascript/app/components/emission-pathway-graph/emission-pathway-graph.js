import { PureComponent, createElement } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import qs from 'query-string';
import { getLocationParamUpdated } from 'utils/navigation';

import { actions as modalActions } from 'components/modal-metadata';

import EmissionPathwayGraphComponent from './emission-pathway-graph-component';
import {
  getChartData,
  getChartConfig,
  getLocationsOptions,
  getLocationSelected,
  getScenarioSelected
} from './emission-pathway-graph-selectors';

const actions = { ...modalActions };

const mapStateToProps = (state, { location }) => {
  const { data } = state.espTimeSeries;
  const { currentLocation, scenario } = qs.parse(location.search);
  const espData = {
    locations: state.espLocations.data,
    data,
    location: currentLocation,
    scenario
  };
  return {
    data: getChartData(espData),
    config: getChartConfig(espData),
    locationsOptions: getLocationsOptions(espData),
    locationSelected: getLocationSelected(espData),
    scenarioSelected: getScenarioSelected(espData),
    loading: state.espTimeSeries.loading || state.espLocations.loading
  };
};

class EmissionPathwayGraphContainer extends PureComponent {
  handleLocationChange = location => {
    this.updateUrlParam(
      { name: 'currentLocation', value: location.value },
      true
    );
  };

  updateUrlParam(params, clear) {
    const { history, location } = this.props;
    history.replace(getLocationParamUpdated(location, params, clear));
  }

  render() {
    return createElement(EmissionPathwayGraphComponent, {
      ...this.props,
      handleLocationChange: this.handleLocationChange
    });
  }
}

EmissionPathwayGraphContainer.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export default withRouter(
  connect(mapStateToProps, actions)(EmissionPathwayGraphContainer)
);
