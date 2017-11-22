import { PureComponent, createElement } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { getLocationParamUpdated } from 'utils/navigation';
import qs from 'query-string';
import {
  filteredDataByCategory,
  defaultColumns,
  getCategories,
  getSelectedCategoryOption
} from './emission-pathways-scenario-table-selectors';
import Component from './emission-pathways-scenario-table-component';

const mapStateToProps = (state, { category, match, location }) => {
  const search = qs.parse(location.search);

  const { id } = match.params;
  const espScenariosData = state.espScenarios && state.espScenarios.data;
  const espIndicatorsData = state.espIndicators && state.espIndicators.data;
  const EspData = {
    categorySelected: search.category,
    query: search.search,
    espScenariosData,
    espIndicatorsData,
    category,
    id
  };

  return {
    data: filteredDataByCategory(EspData),
    defaultColumns: defaultColumns(EspData),
    categories: getCategories(EspData),
    selectedCategory: getSelectedCategoryOption(EspData),
    query: search.search,
    loading: espScenariosData.loading
  };
};

class EmissionPathwaysScenarioTableComponent extends PureComponent {
  handleSearchChange = query => {
    this.updateUrlParam({ name: 'search', value: query });
  };

  handleCategoryChange = category => {
    this.updateUrlParam({
      name: 'category',
      value: category && category.value
    });
  };

  updateUrlParam(param) {
    const { history, location } = this.props;
    history.replace(getLocationParamUpdated(location, param));
  }

  render() {
    const { query } = this.props;
    const noContentMsg = query
      ? 'No results found'
      : 'There is no data for this section';
    return createElement(Component, {
      ...this.props,
      noContentMsg,
      handleSearchChange: this.handleSearchChange,
      handleCategoryChange: this.handleCategoryChange
    });
  }
}

EmissionPathwaysScenarioTableComponent.propTypes = {
  query: PropTypes.string,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export default withRouter(
  connect(mapStateToProps, null)(EmissionPathwaysScenarioTableComponent)
);
