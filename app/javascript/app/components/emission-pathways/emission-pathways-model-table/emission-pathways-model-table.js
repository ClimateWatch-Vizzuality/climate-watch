import { PureComponent, createElement } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {
  filterDataByBlackList,
  defaultColumns,
  titleLinks
} from './emission-pathways-model-table-selectors';
import Component from './emission-pathways-model-table-component';

const mapStateToProps = (state, { category, match }) => {
  const { id } = match.params;
  const espModelsData = state.espModels && state.espModels.data;
  const espIndicatorsData = state.espIndicators && state.espIndicators.data;
  const espScenariosData = state.espScenarios && state.espScenarios.data;
  const EspData = {
    espIndicatorsData,
    espScenariosData,
    espModelsData,
    category,
    modelId: id
  };

  return {
    data: filterDataByBlackList(EspData),
    defaultColumns: defaultColumns(EspData),
    titleLinks: titleLinks(EspData),
    category,
    loading:
      state.espModels.loading ||
      state.espScenarios.loading ||
      state.espIndicators.loading
  };
};

class EmissionPathwaysModelTableComponent extends PureComponent {
  render() {
    const noContentMsg = 'No results found';
    return createElement(Component, {
      ...this.props,
      noContentMsg
    });
  }
}

export default withRouter(
  connect(mapStateToProps, null)(EmissionPathwaysModelTableComponent)
);
