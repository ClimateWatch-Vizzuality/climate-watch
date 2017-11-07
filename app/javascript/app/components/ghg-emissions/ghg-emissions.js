import { PureComponent, createElement } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import qs from 'query-string';
import { getLocationParamUpdated } from 'utils/navigation';

import { actions as modalActions } from 'components/modal-metadata';
import ownActions from './ghg-emissions-actions';
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
  getActiveFilterRegion
} from './ghg-emissions-selectors';

const actions = { ...ownActions, ...modalActions };

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
  const { data } = state.ghgEmissions;
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
    loadingMeta: state.ghgEmissionsMeta.loading,
    loadingData: state.ghgEmissions.loading,
    groups
  };
};

function needsRequestData(props, nextProps) {
  const { sourceSelected, breakSelected } = nextProps;
  const hasValues = sourceSelected && breakSelected;
  const hasChanged =
    hasValues &&
    (sourceSelected !== props.sourceSelected ||
      breakSelected !== props.breakSelected);
  return hasValues && hasChanged;
}

function getFiltersParsed(props) {
  const { sourceSelected, breakSelected, selectorDefaults } = props;
  const filter = {};
  switch (breakSelected.value) {
    case 'gas':
      filter.location = sourceSelected.label === 'UNFCCC' ? 'ANNEXI' : 'WORLD';
      filter.sector = selectorDefaults.sector;
      break;
    case 'location':
      filter.gas = selectorDefaults.gas;
      filter.sector = selectorDefaults.sector;
      break;
    case 'sector':
      filter.gas = selectorDefaults.gas;
      filter.location = sourceSelected.label === 'UNFCCC' ? 'ANNEXI' : 'WORLD';
      break;
    default:
      break;
  }

  return {
    ...filter,
    source: sourceSelected.value
  };
}

class GhgEmissionsContainer extends PureComponent {
  constructor(props) {
    super(props);
    const { sourceSelected, breakSelected, filtersSelected } = props;
    const hasValues =
      sourceSelected && breakSelected && filtersSelected.length > 0;
    if (hasValues) {
      const filters = getFiltersParsed(props);
      props.fetchGhgEmissionsData(filters);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (needsRequestData(this.props, nextProps)) {
      const { fetchGhgEmissionsData } = nextProps;
      const filters = getFiltersParsed(nextProps);
      fetchGhgEmissionsData(filters);
    }
  }

  handleSourceChange = category => {
    this.updateUrlParam({ name: 'source', value: category.value }, true);
  };

  handleBreakByChange = breakBy => {
    const params = [
      { name: 'source', value: this.props.sourceSelected.value },
      { name: 'breakBy', value: breakBy.value }
    ];
    this.updateUrlParam(params, true);
  };

  handleVersionChange = version => {
    this.updateUrlParam({ name: 'version', value: version.value });
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
  };

  updateUrlParam(params, clear) {
    const { history, location } = this.props;
    history.replace(getLocationParamUpdated(location, params, clear));
  }

  handleRemoveTag = tagData => {
    const { filtersSelected } = this.props;
    const newFilters = [];
    filtersSelected.forEach(filter => {
      if (filter.label !== tagData.label) {
        newFilters.push(filter.value);
      }
    });
    this.updateUrlParam({ name: 'filter', value: newFilters.toString() });
  };

  handleInfoClick = () => {
    const { source } = this.props.sourceSelected;
    if (source) {
      this.props.setModalMetadata({
        slug: source,
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
      handleRemoveTag: this.handleRemoveTag,
      handleInfoClick: this.handleInfoClick
    });
  }
}

GhgEmissionsContainer.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  breakSelected: PropTypes.object,
  sourceSelected: PropTypes.object,
  setModalMetadata: PropTypes.func.isRequired,
  fetchGhgEmissionsData: PropTypes.func.isRequired,
  filtersSelected: PropTypes.array
};

GhgEmissionsContainer.defaultProps = {
  sourceSelected: null
};

export { actions, reducers, initialState };

export default withRouter(
  connect(mapStateToProps, actions)(GhgEmissionsContainer)
);
