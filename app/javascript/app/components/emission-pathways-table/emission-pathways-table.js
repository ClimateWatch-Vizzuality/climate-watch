import { PureComponent, createElement } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getLocationParamUpdated } from 'utils/navigation';
import qs from 'query-string';
import PropTypes from 'prop-types';
import { filteredDataBySearch } from './emission-pathways-table-selectors';
import Component from './emission-pathways-table-component';

const mapStateToProps = (state, { model }) => {
  const search = qs.parse(location.search);
  const modelData = state[`esp${model}`];

  const EspData = {
    modelData,
    model,
    query: search.search
    // categorySelected: search.category,
    // indicatorSelected: search.indicator
  };

  return {
    data: filteredDataBySearch(EspData),
    query: EspData.query,
    modelName: model,
    loading: modelData.loading
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
