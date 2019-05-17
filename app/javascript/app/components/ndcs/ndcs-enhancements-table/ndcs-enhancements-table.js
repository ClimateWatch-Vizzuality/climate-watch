import { PureComponent, createElement } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import qs from 'query-string';
import { handleAnalytics } from 'utils/analytics';
import { getLocationParamUpdated } from 'utils/navigation';
import { actions } from 'pages/ndcs-enhancements';

import Component from './ndcs-enhancements-table-component';
import {
  getCategories,
  getCategoryIndicators,
  getCategory,
  //getIndicator,
  removeIsoFromData
} from './ndcs-enhancements-table-selectors';

const mapStateToProps = (state, { location }) => {
  const { data, loading } = state.ndcsEnhancements;
  const { data: countries } = state.countries;
  const search = qs.parse(location.search);
  const ndcsEnhancementsWithSelection = {
    ...data,
    countries,
    query: search.search
  };

  return {
    loading,
    query: ndcsEnhancementsWithSelection.query,
    categories: getCategories(ndcsEnhancementsWithSelection),
    indicators: getCategoryIndicators(ndcsEnhancementsWithSelection),
    category: getCategory(ndcsEnhancementsWithSelection),
    //indicator: getIndicator(ndcsEnhancementsWithSelection),
    data: removeIsoFromData(ndcsEnhancementsWithSelection)
  };
};

class NDCSEnhancementsTableContainer extends PureComponent {
  componentWillMount() {
    this.props.fetchNDCSEnhancements();
  }

  handleSearchChange = query => {
    this.updateUrlParam({ name: 'search', value: query });
  };

  updateUrlParam(param) {
    const { history, location } = this.props;
    history.replace(getLocationParamUpdated(location, param));
    handleAnalytics(
      'NDC Content Table',
      'Searches for something in the table',
      param.value
    );
  }

  render() {
    const { query } = this.props;
    const noContentMsg = query
      ? 'No results found'
      : 'There is no data for this indicator';
    return createElement(Component, {
      ...this.props,
      noContentMsg,
      handleSearchChange: this.handleSearchChange
    });
  }
}

NDCSEnhancementsTableContainer.propTypes = {
  query: PropTypes.string,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  fetchNDCSEnhancements: PropTypes.func.isRequired
};

export default withRouter(
  connect(mapStateToProps, actions)(NDCSEnhancementsTableContainer)
);
