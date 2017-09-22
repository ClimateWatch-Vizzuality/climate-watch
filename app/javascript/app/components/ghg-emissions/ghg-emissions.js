import { PureComponent, createElement } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import qs from 'query-string';
import { getLocationParamUpdated } from 'utils/navigation';

import {
  getSourceOptions,
  getSourceSelected,
  getBreaksByOptions,
  getBreakSelected,
  getFilterOptions,
  getFilterSelected
} from './ghg-emissions-selectors';

import GhgEmissionsComponent from './ghg-emissions-component';
import actions from './ghg-emissions-actions';

const mapStateToProps = (state, { location }) => {
  const { meta } = state.ghgEmissions;
  const { data: regions } = state.regions;
  const search = qs.parse(location.search);
  const ghg = {
    meta,
    regions,
    search
  };
  return {
    sources: getSourceOptions(ghg),
    sourceSelected: getSourceSelected(ghg),
    breaksBy: getBreaksByOptions(ghg),
    breakSelected: getBreakSelected(ghg),
    filters: getFilterOptions(ghg),
    filterSelected: getFilterSelected(ghg)
  };
};

function needsRequestData(props, nextProps) {
  const { sourceSelected, breakSelected, filterSelected } = nextProps;
  const hasValues =
    sourceSelected.value && breakSelected.value && filterSelected.value;
  const hasChanged =
    sourceSelected.value !== props.sourceSelected.value ||
    breakSelected.value !== props.breakSelected.value ||
    filterSelected.value !== props.filterSelected.value;
  return hasValues && hasChanged;
}

function getFiltersParsed(props) {
  const { sourceSelected, breakSelected, filterSelected } = props;
  const filter = {};
  // we need to request default value for other indicators
  switch (breakSelected.value) {
    case 'gas':
      filter.location = 'WORLD';
      filter.sector = 1;
      break;
    case 'locations':
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
    [breakSelected.value]: filterSelected.value
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

  handleFilterChange = filter => {
    this.updateUrlParam({ name: 'filter', value: filter.value });
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
