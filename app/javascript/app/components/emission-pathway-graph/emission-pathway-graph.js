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
  getFiltersOptions,
  getFiltersSelected
} from './emission-pathway-graph-selectors';

const actions = { ...modalActions };

const mapStateToProps = (state, { location }) => {
  const { data } = state.espTimeSeries;
  const { currentLocation, model, indicator, scenario } = qs.parse(
    location.search
  );
  const espData = {
    data,
    locations: state.espLocations.data,
    models: state.espModels.data,
    scenarios: state.espScenarios.data,
    indicators: state.espIndicators.data,
    location: currentLocation,
    model,
    indicator,
    scenario
  };
  return {
    data: getChartData(espData),
    config: getChartConfig(espData),
    filtersOptions: getFiltersOptions(espData),
    filtersSelected: getFiltersSelected(espData),
    loading:
      state.espTimeSeries.loading ||
      state.espLocations.loading ||
      state.espModels.loading ||
      state.espScenarios.loading ||
      state.espIndicators.loading
  };
};

class EmissionPathwayGraphContainer extends PureComponent {
  handleModelChange = model => {
    this.updateUrlParam([
      { name: 'model', value: model.value },
      {
        name: 'scenario',
        value: model.scenarios ? model.scenarios.toString() : ''
      }
    ]);
  };

  handleSelectorChange = (option, param, clear) => {
    this.updateUrlParam(
      { name: param, value: option ? option.value : '' },
      clear
    );
  };

  updateUrlParam(params, clear) {
    const { history, location } = this.props;
    history.replace(getLocationParamUpdated(location, params, clear));
  }

  render() {
    return createElement(EmissionPathwayGraphComponent, {
      ...this.props,
      handleModelChange: this.handleModelChange,
      handleSelectorChange: this.handleSelectorChange
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
