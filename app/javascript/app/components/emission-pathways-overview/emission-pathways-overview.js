import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Component from './emission-pathways-overview-component';
import { parseArraysOverviewData } from './emission-pathways-overview-selectors';

const mapStateToProps = (state, { match, category }) => {
  const id = match.params.id;

  const categoryData = state[`esp${category}`];
  const stateWithId = {
    id,
    category,
    categoryData
  };
  return {
    data: parseArraysOverviewData(stateWithId)
  };
};

export default withRouter(connect(mapStateToProps)(Component));
