import { PureComponent, createElement } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import qs from 'query-string';
import { getLocationParamUpdated } from 'utils/navigation';
import isArray from 'lodash/isArray';

import { actions as modalActions } from 'components/modal-overview';
import { actions as pngModalActions } from 'components/modal-png-download';

import ownActions from './emission-pathways-graph-actions';
import reducers, { initialState } from './emission-pathways-graph-reducers';

import EmissionPathwayGraphComponent from './emission-pathways-graph-component';
import {
  getChartData,
  getChartDomainWithYMargins,
  getChartConfig,
  getFiltersOptions,
  getFiltersSelected,
  getModalData,
  getModelSelected,
  getLinkToDataExplorer,
  getPngSelectionSubtitle
} from './emission-pathways-graph-selectors';

const actions = { ...ownActions, ...modalActions, ...pngModalActions };

const mapStateToProps = (state, { location }) => {
  const { data } = state.espTimeSeries;
  const search = qs.parse(location.search);
  const {
    currentLocation,
    model,
    indicator,
    scenario,
    category,
    subcategory
  } = search;
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
    category,
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
    modalData: getModalData(espData),
    model: getModelSelected(espData),
    error: providers.some(p => state[p].error),
    loading: providers.some(p => state[p].loading) || !filtersSelected.model,
    search,
    downloadLink: getLinkToDataExplorer(espData),
    pngSelectionSubtitle: getPngSelectionSubtitle(espData)
  };
};

const pngDownloadId = 'emission-pathway-graph';

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
      'category',
      'subcategory',
      'indicator',
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
    this.updateUrlParam(params, true);
  };

  handleSelectorChange = (option, param, clear) => {
    const params = [{ name: param, value: option ? option.value : '' }];
    if (param === 'category') {
      params.push({ name: 'subcategory', value: '' });
    }
    if (param === 'category' || param === 'subcategory') {
      params.push({ name: 'indicator', value: '' });
    }
    this.updateUrlParam(params, clear);
  };

  handleClearSelection = () => {
    const { location } = this.props.filtersSelected;
    this.updateUrlParam(
      { name: 'currentLocation', value: location.value },
      true
    );
  };

  updateUrlParam(params, clear) {
    const { history, location } = this.props;
    history.replace(getLocationParamUpdated(location, params, clear));
  }

  handleInfoClick = () => {
    this.props.toggleModalOverview({ open: true });
  };

  handlePngDownloadModal = () => {
    this.props.setModalPngDownload({ open: pngDownloadId });
  };

  render() {
    return createElement(EmissionPathwayGraphComponent, {
      ...this.props,
      pngDownloadId,
      handleInfoClick: this.handleInfoClick,
      handleModelChange: this.handleModelChange,
      handleSelectorChange: this.handleSelectorChange,
      handlePngDownloadModal: this.handlePngDownloadModal,
      handleClearSelection: this.handleClearSelection
    });
  }
}

EmissionPathwayGraphContainer.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  filtersSelected: PropTypes.object.isRequired,
  toggleModalOverview: PropTypes.func.isRequired,
  findAvailableModels: PropTypes.func.isRequired,
  search: PropTypes.object,
  setModalPngDownload: PropTypes.func.isRequired
};

export { actions, reducers, initialState };
export default withRouter(
  connect(mapStateToProps, actions)(EmissionPathwayGraphContainer)
);
