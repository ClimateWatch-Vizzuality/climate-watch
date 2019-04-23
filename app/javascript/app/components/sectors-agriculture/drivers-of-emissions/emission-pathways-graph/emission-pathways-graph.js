import { PureComponent, createElement } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import qs from 'query-string';
import { getLocationParamUpdated } from 'utils/navigation';
import isArray from 'lodash/isArray';

import { actions as modalActions } from 'components/modal-overview';

import ownActions from './emission-pathways-graph-actions';
import reducers, { initialState } from './emission-pathways-graph-reducers';

import EmissionPathwayGraphComponent from './emission-pathways-graph-component';
import {
  getChartData,
  getChartDomainWithYMargins,
  getChartConfig,
  getFiltersOptions,
  getFiltersSelected,
  getExplorePathwaysButtonConfig,
  getModalData,
  getModelSelected,
  getLinkToDataExplorer
} from './emission-pathways-graph-selectors';

const actions = { ...ownActions, ...modalActions };

const mapStateToProps = (state, { location }) => {
  const { data } = state.espTimeSeries;
  const search = qs.parse(location.search);
  const { currentLocation, model, indicator, scenario, subcategory } = search;
  const espData = {
    data,
    locations: state.espLocations.data,
    models: state.espModels.data,
    allScenarios: state.espScenarios.data,
    indicators: state.espIndicators.data,
    location: currentLocation,
    availableModels: state.espGraph.locations,
    model,
    indicator,
    scenario,
    subcategory,
    search
  };
  const providers = [
    'espTimeSeries',
    'espLocations',
    'espModels',
    'espScenarios',
    'espIndicators',
    'espGraph'
  ];
  const filtersSelected = getFiltersSelected(espData);
  return {
    data: getChartData(espData),
    domain: getChartDomainWithYMargins(espData),
    config: getChartConfig(espData),
    filtersLoading: {
      timeseries: state.espTimeSeries.loading,
      locations: state.espLocations.loading,
      models: state.espModels.loading,
      indicators: state.espIndicators.loading
    },
    filtersOptions: getFiltersOptions(espData),
    filtersSelected,
    explorePathwaysConfig: getExplorePathwaysButtonConfig(espData),
    modalData: getModalData(espData),
    model: getModelSelected(espData),
    error: providers.some(p => state[p].error),
    loading: providers.some(p => state[p].loading) || !filtersSelected.model,
    search,
    downloadLink: getLinkToDataExplorer(espData)
  };
};

class EmissionPathwayGraphContainer extends PureComponent {
  componentDidMount() {
    const { location } = this.props.filtersSelected;
    if (location) {
      const locationId = location.value || location;
      this.props.findAvailableModels(locationId);
    }
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.filtersSelected.location !== this.props.filtersSelected.location
    ) {
      const currentLocation = this.props.filtersSelected.location;
      this.props.findAvailableModels(currentLocation.value);
    }

    const { search, filtersSelected } = this.props;
    this.updateUrlWithNewParams(search, filtersSelected);
  }

  updateUrlWithNewParams = (search, filtersSelected) => {
    const possibleParams = [
      'model',
      'indicator',
      'subcategory',
      'currentLocation',
      'scenario'
    ];
    const paramsToUpdate = [];
    const getFilterParamValue = f => {
      if (isArray(filtersSelected[f])) {
        return search[f]
          ? filtersSelected[f]
            .filter(selectedFilter =>
              search[f].includes(selectedFilter.value)
            )
            .join(',')
          : filtersSelected[f].map(filter => filter.value).join(',');
      }
      return filtersSelected[f].value;
    };

    possibleParams.forEach(f => {
      if (!search[f]) {
        if (f === 'currentLocation' && filtersSelected.location) {
          paramsToUpdate.push({
            name: f,
            value:
              (filtersSelected[f] && filtersSelected[f].value) ||
              filtersSelected.location.value
          });
        } else if (f !== 'currentLocation' && filtersSelected[f]) {
          const value = getFilterParamValue(f);
          if (value) paramsToUpdate.push({ name: f, value });
        }
      }
    });
    if (paramsToUpdate.length) this.updateUrlParam(paramsToUpdate);
  };

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
    this.updateUrlParam(params);
  };

  handleSubcategoryChange = subcategory => {
    const { location } = this.props.filtersSelected;
    const params = [{ name: 'subcategory', value: subcategory.value }];
    if (location && location.value) {
      params.push({ name: 'currentLocation', value: location.value });
    }
    this.updateUrlParam(params);
  };

  handleSelectorChange = (option, param, clear) => {
    const params = [{ name: param, value: option ? option.value : '' }];
    this.updateUrlParam(params, clear);
  };

  handleCurrentLocationChange = location => {
    const params = [
      { name: 'currentLocation', value: location ? location.value : '' },
      { name: 'subcategory', value: '' },
      { name: 'model', value: '' },
      { name: 'indicator', value: '' },
      { name: 'scenario', value: '' }
    ];
    this.updateUrlParam(params);
  };

  handleClearSelection = () => {
    const { search } = this.props;
    const { model, scenario, ...rest } = search;
    const params = Object.keys(rest).map(k => ({ name: k, value: rest[k] }));
    this.updateUrlParam(params, true);
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
      handleSelectorChange: this.handleSelectorChange,
      handleClearSelection: this.handleClearSelection,
      handleSubcategoryChange: this.handleSubcategoryChange,
      handleCurrentLocationChange: this.handleCurrentLocationChange
    });
  }
}

EmissionPathwayGraphContainer.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  filtersSelected: PropTypes.object.isRequired,
  toggleModalOverview: PropTypes.func.isRequired,
  findAvailableModels: PropTypes.func.isRequired,
  search: PropTypes.object
};

export { actions, reducers, initialState };
export default withRouter(
  connect(mapStateToProps, actions)(EmissionPathwayGraphContainer)
);
