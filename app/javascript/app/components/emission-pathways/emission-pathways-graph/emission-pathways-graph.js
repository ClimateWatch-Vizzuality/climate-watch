import { PureComponent, createElement } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import qs from 'query-string';
import { getLocationParamUpdated } from 'utils/navigation';

import { actions as modalActions } from 'components/modal-overview';

import ownActions from './emission-pathways-graph-actions';
import reducers, { initialState } from './emission-pathways-graph-reducers';

import EmissionPathwayGraphComponent from './emission-pathways-graph-component';
import {
  getChartData,
  getChartConfig,
  getFiltersOptions,
  getFiltersSelected,
  getModalData
} from './emission-pathways-graph-selectors';

const actions = { ...ownActions, ...modalActions };

const mapStateToProps = (state, { location }) => {
  const { data } = state.espTimeSeries;
  const {
    currentLocation,
    model,
    indicator,
    scenario,
    category,
    subcategory
  } = qs.parse(location.search);
  const espData = {
    data,
    locations: state.espLocations.data,
    models: state.espModels.data,
    scenarios: state.espScenarios.data,
    indicators: state.espIndicators.data,
    location: currentLocation,
    availableModels: state.espGraph.locations,
    model,
    indicator,
    scenario,
    category,
    subcategory
  };
  return {
    data: getChartData(espData),
    config: getChartConfig(espData),
    filtersLoading: {
      timeseries: state.espTimeSeries.loading,
      locations: state.espLocations.loading,
      models: state.espModels.loading,
      indicators: state.espIndicators.loading
    },
    filtersOptions: getFiltersOptions(espData),
    filtersSelected: getFiltersSelected(espData),
    modalData: getModalData(espData),
    loading:
      state.espTimeSeries.loading ||
      state.espLocations.loading ||
      state.espModels.loading ||
      state.espScenarios.loading ||
      state.espIndicators.loading
  };
};

class EmissionPathwayGraphContainer extends PureComponent {
  componentDidUpdate(prevProps) {
    if (
      prevProps.filtersSelected.location !== this.props.filtersSelected.location
    ) {
      const currentLocation = this.props.filtersSelected.location;
      this.props.findAvailableModels(currentLocation.value);
    }
  }

  handleModelChange = model => {
    const { location } = this.props.filtersSelected;
    const params = [
      { name: 'model', value: model.value },
      {
        name: 'scenario',
        value: model.scenarios ? model.scenarios.toString() : ''
      }
    ];
    if (location && location.value) {
      params.push({ name: 'currentLocation', value: location.value });
    }
    this.updateUrlParam(params, true);
  };

  handleSelectorChange = (option, param, clear) => {
    const params = [{ name: param, value: option ? option.value : '' }];
    if (param === 'category') {
      params.push({ name: 'subcategory', value: '' });
    }
    if (param === 'subcategory') {
      params.push({ name: 'indicator', value: '' });
    }
    this.updateUrlParam(params, clear);
  };

  updateUrlParam(params, clear) {
    const { history, location } = this.props;
    history.replace(getLocationParamUpdated(location, params, clear));
  }

  handleInfoClick = () => {
    this.props.toggleModalOverview({ open: true });
  };

  render() {
    return createElement(EmissionPathwayGraphComponent, {
      ...this.props,
      handleInfoClick: this.handleInfoClick,
      handleModelChange: this.handleModelChange,
      handleSelectorChange: this.handleSelectorChange
    });
  }
}

EmissionPathwayGraphContainer.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  filtersSelected: PropTypes.object.isRequired,
  toggleModalOverview: PropTypes.func.isRequired,
  findAvailableModels: PropTypes.func.isRequired
};

export { actions, reducers, initialState };
export default withRouter(
  connect(mapStateToProps, actions)(EmissionPathwayGraphContainer)
);
