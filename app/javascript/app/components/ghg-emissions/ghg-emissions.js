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

const mapStateToProps = state => {
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

class GhgEmissionsContainer extends PureComponent {
  componentDidMount() {
    const { fetchGhgEmissionsMeta } = this.props;
    fetchGhgEmissionsMeta();
  }

  handleSourceChange = category => {
    this.updateUrlParam({ name: 'source', value: category.value, clear: true });
  };

  handleBreakByChange = breakBy => {
    this.updateUrlParam({ name: 'breakBy', value: breakBy.value });
  };

  handleFilterChange = selection => {
    console.info(selection);
    // this.updateUrlParam({ name: 'selection', value: selection.value });
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
  fetchGhgEmissionsMeta: PropTypes.func.isRequired
};

export { default as component } from './ghg-emissions-component';
export { initialState } from './ghg-emissions-reducers';
export { default as reducers } from './ghg-emissions-reducers';
export { default as styles } from './ghg-emissions-styles';
export { default as actions } from './ghg-emissions-actions';

export default withRouter(
  connect(mapStateToProps, actions)(GhgEmissionsContainer)
);
