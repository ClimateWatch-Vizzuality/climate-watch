import { PureComponent, createElement } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import qs from 'query-string';

import Component from './ndcs-table-component';
import {
  getCategories,
  getCategoryIndicators,
  getSelectedCategory,
  getSelectedIndicator,
  getFilteredData
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
    data: getFilteredData(ndcsWithSelection)
  };
};

class NDCTableContainer extends PureComponent {
  handleCategoryChange = category => {
    this.updateUrlParam('category', category.value, true);
  };

  handleIndicatorChange = indicator => {
    this.updateUrlParam('indicator', indicator.value);
  };

  handleSearchChange = query => {
    this.updateUrlParam('search', query);
  };

  updateUrlParam(param, value, clear = false) {
    const { history, location } = this.props;
    const search = qs.parse(location.search);
    const newSearch = clear
      ? { [param]: value }
      : {
        ...search,
        [param]: value
      };

    history.replace({
      pathname: location.pathname,
      search: qs.stringify(newSearch)
    });
  }

  render() {
    return createElement(Component, {
      ...this.props,
      handleCategoryChange: this.handleCategoryChange,
      handleIndicatorChange: this.handleIndicatorChange,
      handleSearchChange: this.handleSearchChange
    });
  }
}

NDCTableContainer.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export default withRouter(connect(mapStateToProps)(NDCTableContainer));
