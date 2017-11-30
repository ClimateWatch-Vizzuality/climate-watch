import { createElement, PureComponent } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Component from './emission-pathways-overview-component';
import {
  selectOverviewData,
  filterDataByBlackList,
  getModalTitle
} from './emission-pathways-overview-selectors';
import { actions } from './modal-overview/modal-overview';

const mapStateToProps = (state, { match, category }) => {
  const id = match.params.id;
  const categoryState = state[`esp${category}`];
  const categoryData = categoryState && categoryState.data;
  const stateWithId = {
    id,
    category,
    categoryData
  };

  return {
    fullData: filterDataByBlackList(stateWithId),
    data: selectOverviewData(stateWithId),
    modalTitle: getModalTitle(stateWithId),
    loading: state.espModels.loading
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
