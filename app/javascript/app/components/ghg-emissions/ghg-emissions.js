import { PureComponent, createElement } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import qs from 'query-string';
import { getLocationParamUpdated } from 'utils/navigation';
import isEqual from 'lodash/isEqual';

import {
  getChartData,
  getChartConfig,
  getSourceOptions,
  getSourceSelected,
  getBreaksByOptions,
  getBreakSelected,
  getFilterOptions,
  getFiltersSelected
} from './ghg-emissions-selectors';

import GhgEmissionsComponent from './ghg-emissions-component';
import actions from './ghg-emissions-actions';

const lineColors = [
  '#2D9290',
  '#B25BD0',
  '#7EA759',
  '#FF0D3A',
  '#687AB7',
  '#BC6332',
  '#F97DA1',
  '#00971D',
  '#F1933B',
  '#938126'
];

const mapStateToProps = (state, { location }) => {
  const { meta, data } = state.ghgEmissions;
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
    breaksBy: getBreaksByOptions(ghg),
    breakSelected: getBreakSelected(ghg),
    filters: getFilterOptions(ghg),
    filtersSelected: getFiltersSelected(ghg),
    colors: lineColors
  };
};

function needsRequestData(props, nextProps) {
  const { sourceSelected, breakSelected, filtersSelected } = nextProps;
  const hasValues =
    sourceSelected.value && breakSelected.value && filtersSelected;
  const hasChanged =
    sourceSelected.value !== props.sourceSelected.value ||
    breakSelected.value !== props.breakSelected.value ||
    !isEqual(filtersSelected, props.filtersSelected);
  return hasValues && hasChanged;
}

function getFiltersParsed(props) {
  const { sourceSelected, breakSelected, filtersSelected } = props;
  const filter = {};
  // we need to request default value for other indicators
  switch (breakSelected.value) {
    case 'gas':
      filter.location = 'WORLD';
      filter.sector = 1;
      break;
    case 'location':
      filter.gas = 1;
      filter.sector = 1;
      break;
    case 'sector':
      filter.gas = 1;
      filter.location = 'WORLD';
      break;
    default:
      break;
  }
  return {
    ...filter,
    source: sourceSelected.value,
    [breakSelected.value]: filtersSelected.value
  };
}

class GhgEmissionsContainer extends PureComponent {
  componentDidMount() {
    const { fetchGhgEmissionsMeta } = this.props;
    fetchGhgEmissionsMeta();
  }

  componentWillReceiveProps(nextProps) {
    if (needsRequestData(this.props, nextProps)) {
      const { fetchGhgEmissionsData } = nextProps;
      const filters = getFiltersParsed(nextProps);
      fetchGhgEmissionsData(filters);
    }
  }

  handleSourceChange = category => {
    this.updateUrlParam({ name: 'source', value: category.value, clear: true });
  };

  handleBreakByChange = breakBy => {
    this.updateUrlParam({ name: 'breakBy', value: breakBy.value });
  };

  handleFilterChange = filters => {
    const filtersParam = filters.map(filter => filter.value);
    this.updateUrlParam({ name: 'filter', value: filtersParam.toString() });
  };

  updateUrlParam(param) {
    const { history, location } = this.props;
    history.replace(getLocationParamUpdated(location, param));
  }

  render() {
    return createElement(GhgEmissionsComponent, {
      ...this.props,
      handleSourceChange: this.handleSourceChange,
      handleBreakByChange: this.handleBreakByChange,
      handleFilterChange: this.handleFilterChange
    });
  }
}

GhgEmissionsContainer.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  fetchGhgEmissionsMeta: PropTypes.func.isRequired,
  fetchGhgEmissionsData: PropTypes.func.isRequired
};

export { default as component } from './ghg-emissions-component';
export { initialState } from './ghg-emissions-reducers';
export { default as reducers } from './ghg-emissions-reducers';
export { default as styles } from './ghg-emissions-styles';
export { default as actions } from './ghg-emissions-actions';

export default withRouter(
  connect(mapStateToProps, actions)(GhgEmissionsContainer)
);
