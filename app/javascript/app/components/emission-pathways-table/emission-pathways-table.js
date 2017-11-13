import { PureComponent, createElement } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getLocationParamUpdated } from 'utils/navigation';
import qs from 'query-string';
import PropTypes from 'prop-types';
import { filteredDataBySearch } from './emission-pathways-table-selectors';
import Component from './emission-pathways-table-component';

const mapStateToProps = (state, { category }) => {
  const search = qs.parse(location.search);
  const categoryData = state[`esp${category}`];

  const EspData = {
    categoryData,
    category,
    query: search.search
    // categorySelected: search.category,
    // indicatorSelected: search.indicator
  };

  return {
    data: filteredDataBySearch(EspData),
    query: EspData.query,
    categoryName: category,
    loading: categoryData.loading
    // selectedCategory: getSelectedCategory(ndcsWithSelection),
    // selectedIndicator: getSelectedIndicator(ndcsWithSelection)
  };
};

class EmissionPatwaysTableComponent extends PureComponent {
  // handleCategoryChange = category => {
  //   this.updateUrlParam({
  //     name: 'category',
  //     value: category.value,
  //     clear: true
  //   });
  // };

  // handleIndicatorChange = indicator => {
  //   this.updateUrlParam({ name: 'indicator', value: indicator.value });
  // };

  handleSearchChange = query => {
    this.updateUrlParam({ name: 'search', value: query });
  };

  updateUrlParam(param) {
    const { history, location } = this.props;
    history.replace(getLocationParamUpdated(location, param));
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

EmissionPatwaysTableComponent.propTypes = {
  query: PropTypes.string,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export default withRouter(
  connect(mapStateToProps, null)(EmissionPatwaysTableComponent)
);
