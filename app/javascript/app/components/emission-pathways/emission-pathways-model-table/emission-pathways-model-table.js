import { PureComponent, createElement } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {
  filterDataByBlackList,
  defaultColumns,
  fullTextColumns,
  titleLinks
} from './emission-pathways-model-table-selectors';
import Component from './emission-pathways-model-table-component';

const mapStateToProps = (state, { category, match }) => {
  const { id } = match.params;
  const espModelsData = state.espModels && state.espModels.data;
  const espScenariosData = state.espScenarios && state.espScenarios.data;
  const EspData = {
    espScenariosData,
    espModelsData,
    category,
    modelId: id
  };

  return {
    data: filterDataByBlackList(EspData),
    defaultColumns,
    fullTextColumns,
    titleLinks: titleLinks(EspData),
    category,
    loading: state.espModels.loading || state.espScenarios.loading
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
