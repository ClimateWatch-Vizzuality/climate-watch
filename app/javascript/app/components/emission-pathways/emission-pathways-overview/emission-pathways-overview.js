import { createElement, PureComponent } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { actions } from 'components/modal-overview';
import Component from './emission-pathways-overview-component';
import {
  selectOverviewData,
  filterDataByBlackList,
  getModalTitle
} from './emission-pathways-overview-selectors';

const mapStateToProps = (state, { match, category }) => {
  const id = match.params.id;
  const categoryState = state[`esp${category}`];
  const categoryData = categoryState && categoryState.data;
  const modelsData = state.espModels && state.espModels.data;
  const stateWithId = {
    id,
    category,
    categoryData,
    modelsData
  };

  return {
    fullData: filterDataByBlackList(stateWithId),
    data: selectOverviewData(stateWithId),
    modalTitle: getModalTitle(stateWithId),
    loading: categoryState.loading
  };
};

class EmissionPathwaysOverviewContainer extends PureComponent {
  handleInfoClick = () => {
    this.props.toggleModalOverview({ open: true });
  };

  render() {
    return createElement(Component, {
      ...this.props,
      handleInfoClick: this.handleInfoClick
    });
  }
}

EmissionPathwaysOverviewContainer.propTypes = {
  toggleModalOverview: Proptypes.func.isRequired
};

export default withRouter(
  connect(mapStateToProps, actions)(EmissionPathwaysOverviewContainer)
);
