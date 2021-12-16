import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { getIndicators } from './country-subnational-actions-selectors';

import Component from './country-subnational-actions-component';

const mapStateToProps = (state, { match }) => {
  const iso = match.params.iso;

  return {
    iso,
    loading: state.countryProfileIndicators.loading,
    indicators: getIndicators({ ...state, iso })
  };
};

export default withRouter(connect(mapStateToProps, null)(Component));
