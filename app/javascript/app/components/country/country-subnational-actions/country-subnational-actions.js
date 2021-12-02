import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Component from './country-subnational-actions-component';

const mapStateToProps = (state, { match }) => {
  const iso = match.params.iso;
  const { countryProfileIndicators } = state;

  return {
    iso,
    indicators: countryProfileIndicators.data
  };
};

export default withRouter(connect(mapStateToProps, null)(Component));
