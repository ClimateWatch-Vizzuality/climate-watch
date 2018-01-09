import { PureComponent, createElement } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import qs from 'query-string';
import ReactGA from 'react-ga';
import { getLocationParamUpdated } from 'utils/navigation';

import Component from './ndcs-table-component';
import {
  getCategories,
  getCategoryIndicators,
  getSelectedCategory,
  getSelectedIndicator,
  removeIsoFromData,
  getTitleLinks
} from './ndcs-table-selectors';

const mapStateToProps = (state, { location }) => {
  const { data, loading } = state.ndcs;
  const { data: countries } = state.countries;
  const search = qs.parse(location.search);
  const ndcsWithSelection = {
    ...data,
    countries,
    query: search.search,
    categorySelected: search.category,
    indicatorSelected: search.indicator
  };

  return {
    loading,
    query: ndcsWithSelection.query,
    categories: getCategories(ndcsWithSelection),
    indicators: getCategoryIndicators(ndcsWithSelection),
    selectedCategory: getSelectedCategory(ndcsWithSelection),
    selectedIndicator: getSelectedIndicator(ndcsWithSelection),
    data: removeIsoFromData(ndcsWithSelection),
    titleLinks: getTitleLinks(ndcsWithSelection)
  };
};

class NDCTableContainer extends PureComponent {
  handleCategoryChange = category => {
    this.updateUrlParam({
      name: 'category',
      value: category.value,
      clear: true
    });
    ReactGA.event({
      category: 'NDC Content Table',
      action: 'Change category',
      label: category.label
    });
  };

  handleIndicatorChange = indicator => {
    this.updateUrlParam({ name: 'indicator', value: indicator.value });
    ReactGA.event({
      category: 'NDC Content Table',
      action: 'Change indicator',
      label: indicator.label
    });
  };

  handleSearchChange = query => {
    this.updateUrlParam({ name: 'search', value: query });
  };

  updateUrlParam(param) {
    const { history, location } = this.props;
    history.replace(getLocationParamUpdated(location, param));
    ReactGA.event({
      category: 'NDC Content Table',
      action: 'Searches for something in the table',
      label: param.value
    });
  }

  render() {
    const { query } = this.props;
    const noContentMsg = query
      ? 'No results found'
      : 'There is no data for this indicator';
    return createElement(Component, {
      ...this.props,
      noContentMsg,
      handleCategoryChange: this.handleCategoryChange,
      handleIndicatorChange: this.handleIndicatorChange,
      handleSearchChange: this.handleSearchChange
    });
  }
}

NDCTableContainer.propTypes = {
  query: PropTypes.string,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export default withRouter(connect(mapStateToProps)(NDCTableContainer));
