import { PureComponent, createElement } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import qs from 'query-string';
import { getLocationParamUpdated } from 'utils/navigation';
import ReactGA from 'react-ga';

import { actions } from 'components/modal-metadata';
import reducers, { initialState } from './ghg-emissions-reducers';

import GhgEmissionsComponent from './ghg-emissions-component';
import {
  getChartData,
  getChartConfig,
  getSourceOptions,
  getSourceSelected,
  getVersionOptions,
  getVersionSelected,
  getBreaksByOptions,
  getBreakSelected,
  getFilterOptions,
  getFiltersSelected,
  getSelectorDefaults,
  getProviderFilters,
  getActiveFilterRegion
} from './ghg-emissions-selectors';

const groups = [
  {
    groupId: 'regions',
    title: 'Regions'
  },
  {
    groupId: 'countries',
    title: 'Countries'
  }
];

const mapStateToProps = (state, { location }) => {
  const { data } = state.emissions;
  const { meta } = state.ghgEmissionsMeta;
  const { data: regions } = state.regions;
  const search = qs.parse(location.search);
  const ghg = {
    meta,
    data,
    regions,
    search
  };
  return {
    data: getChartData(ghg),
    config: getChartConfig(ghg),
    sources: getSourceOptions(ghg),
    sourceSelected: getSourceSelected(ghg),
    versions: getVersionOptions(ghg),
    versionSelected: getVersionSelected(ghg),
    breaksBy: getBreaksByOptions(ghg),
    breakSelected: getBreakSelected(ghg),
    filters: getFilterOptions(ghg),
    filtersSelected: getFiltersSelected(ghg),
    selectorDefaults: getSelectorDefaults(ghg),
    activeFilterRegion: getActiveFilterRegion(ghg),
    providerFilters: getProviderFilters(ghg),
    loading: state.ghgEmissionsMeta.loading || state.emissions.loading,
    groups
  };
};

class GhgEmissionsContainer extends PureComponent {
  handleSourceChange = category => {
    this.updateUrlParam([{ name: 'source', value: category.value }]);
    ReactGA.event({
      category: 'Historical Emissions',
      action: 'Source selected',
      label: category.label
    });
  };

  handleBreakByChange = breakBy => {
    const { versionSelected } = this.props;
    const params = [
      { name: 'source', value: this.props.sourceSelected.value },
      { name: 'breakBy', value: breakBy.value },
      { name: 'version', value: versionSelected.value }
    ];
    this.updateUrlParam(params, true);
    ReactGA.event({
      category: 'Historical Emissions',
      action: 'Break by selected',
      label: breakBy.label
    });
  };

  handleVersionChange = version => {
    this.updateUrlParam({ name: 'version', value: version.value });
    ReactGA.event({
      category: 'Historical Emissions',
      action: 'version selected',
      label: version.label
    });
  };

  handleFilterChange = filters => {
    const oldFilters = this.props.filtersSelected;
    const removing = filters.length < oldFilters.length;
    const selectedFilter = filters
      .filter(x => oldFilters.indexOf(x) === -1)
      .concat(oldFilters.filter(x => filters.indexOf(x) === -1))[0];
    const filtersParam = [];
    if (!removing && selectedFilter.groupId === 'regions') {
      filtersParam.push(selectedFilter.iso);
      selectedFilter.members.forEach(m => filtersParam.push(m));
    } else if (selectedFilter.groupId !== 'regions') {
      filters.forEach(filter => {
        if (filter.groupId !== 'regions') {
          filtersParam.push(
            this.props.breakSelected.value === 'location'
              ? filter.iso
              : filter.value
          );
        }
      });
    }
    this.updateUrlParam({ name: 'filter', value: filtersParam.toString() });
    const selectedFilterLabels = filters.map(f => f.label);
    if (selectedFilterLabels.length > 0) {
      ReactGA.event({
        category: 'Historical Emissions',
        action: 'Filter by',
        label: selectedFilterLabels.toString()
      });
    }
  };

  updateUrlParam(params, clear) {
    const { history, location } = this.props;
    history.replace(getLocationParamUpdated(location, params, clear));
  }

  handleInfoClick = () => {
    const { source } = this.props.sourceSelected;
    if (source) {
      this.props.setModalMetadata({
        category: 'Historical Emissions',
        slugs: source,
        open: true
      });
    }
  };

  render() {
    return createElement(GhgEmissionsComponent, {
      ...this.props,
      handleSourceChange: this.handleSourceChange,
      handleVersionChange: this.handleVersionChange,
      handleBreakByChange: this.handleBreakByChange,
      handleFilterChange: this.handleFilterChange,
      handleInfoClick: this.handleInfoClick
    });
  }
}

GhgEmissionsContainer.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  breakSelected: PropTypes.object,
  sourceSelected: PropTypes.object,
  versionSelected: PropTypes.object,
  setModalMetadata: PropTypes.func.isRequired,
  filtersSelected: PropTypes.array
};

GhgEmissionsContainer.defaultProps = {
  sourceSelected: null
};

export { actions, reducers, initialState };

export default withRouter(
  connect(mapStateToProps, actions)(GhgEmissionsContainer)
);
