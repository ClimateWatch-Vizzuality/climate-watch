import { PureComponent, createElement } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { filteredCategoryData } from './emission-pathways-model-table-selectors';
import Component from './emission-pathways-model-table-component';

const mapStateToProps = (state, { category, match }) => {
  const { id } = match.params;
  const espModelsData = state.espModels && state.espModels.data;
  const EspData = {
    espModelsData,
    category,
    id
  };

  return {
    data: filteredCategoryData(EspData),
    categoryName: category,
    loading: espModelsData.loading
  };
};

class EmissionPathwaysModelTableComponent extends PureComponent {
  render() {
    const noContentMsg = 'No results found';
    return createElement(Component, {
      ...this.props,
      noContentMsg,
      handleSearchChange: this.handleSearchChange
    });
  }
}

export default withRouter(
  connect(mapStateToProps, null)(EmissionPathwaysModelTableComponent)
);
