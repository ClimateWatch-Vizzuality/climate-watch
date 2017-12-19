import { PureComponent, createElement } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import qs from 'query-string';
import { getLocationParamUpdated } from 'utils/navigation';
import { actions as modalActions } from 'components/modal-overview';

import EmissionPathwayGraphComponent from './emission-pathway-graph-component';
import {
  getChartData,
  getChartConfig,
  getFiltersOptions,
  getFiltersSelected,
  getModalData
} from './emission-pathway-graph-selectors';
import ownActions from './emission-pathway-graph-actions';
import reducers, { initialState } from './emission-pathway-graph-reducers';

const actions = { ...modalActions, ...ownActions };

const mapStateToProps = (state, { location }) => {
  const { data } = state.espTimeSeries;
  const { currentLocation, model, indicator, scenario, category } = qs.parse(
    location.search
  );
  const espData = {
    data,
    locations: state.espLocations.data,
    models: state.espModels.data,
    scenarios: state.espScenarios.data,
    indicators: state.espIndicators.data,
    location: currentLocation,
    availableModelIds: state.espGraph.locations,
    category,
    model,
    indicator,
    scenario
  };
  return {
    data: getChartData(espData),
    config: getChartConfig(espData),
    filtersOptions: getFiltersOptions(espData),
    filtersSelected: getFiltersSelected(espData),
    modalData: getModalData(espData),
    loading:
      state.espTimeSeries.loading ||
      state.espLocations.loading ||
      state.espModels.loading ||
      state.espScenarios.loading ||
      state.espIndicators.loading,
    location
  };
};

class EmissionPathwayGraphContainer extends PureComponent {
  componentDidUpdate(prevProps) {
    const prevValue =
      prevProps.filtersSelected.location &&
      prevProps.filtersSelected.location.value;
    const currentValue =
      this.props.filtersSelected.location &&
      this.props.filtersSelected.location.value;
    if (prevValue !== currentValue) {
      this.props.findAvailableModels(currentValue);
    }
  }

  handleModelChange = model => {
    this.updateUrlParam([
      { name: 'model', value: model.value },
      {
        name: 'scenario',
        value: model.scenarios ? model.scenarios.toString() : ''
      }
    ]);
  };

  handleInfoClick = () => {
    this.props.toggleModalOverview({ open: true });
  };

  handleSelectorChange = (option, param, clear) => {
    this.updateUrlParam(
      { name: param, value: option ? option.value : '' },
      clear
    );
  };

  handleCategoryChange = (option, param, clear) => {
    const { location } = this.props;
    const query = qs.parse(location.search);
    this.updateUrlParam(
      [
        { name: 'currentLocation', value: query.currentLocation || null },
        { name: 'model', value: query.model || null },
        { name: 'scenario', value: query.scenario || null },
        { name: 'category', value: option.value || null },
        { name: 'indicator', value: null }
      ],
      clear
    );
    if (param === 'currentLocation') {
      this.props.findAvailableModels(option.value);
    }
  };

  updateUrlParam(params, clear) {
    const { history, location } = this.props;
    history.replace(getLocationParamUpdated(location, params, clear));
  }

  render() {
    return createElement(EmissionPathwayGraphComponent, {
      ...this.props,
      handleModelChange: this.handleModelChange,
      handleSelectorChange: this.handleSelectorChange,
      handleInfoClick: this.handleInfoClick,
      handleCategoryChange: this.handleCategoryChange
    });
  }
}

EmissionPathwayGraphContainer.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  filtersSelected: PropTypes.object,
  findAvailableModels: PropTypes.func.isRequired,
  toggleModalOverview: PropTypes.func.isRequired
};

export { actions, reducers, initialState };
export default withRouter(
  connect(mapStateToProps, actions)(EmissionPathwayGraphContainer)
);
