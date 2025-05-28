import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Component from './country-climate-enhancements-component';
import {
  getComparisonIndicators,
  getCountryName
} from './country-climate-enhancements-selectors';

const mapStateToProps = (state, { match }) => {
  const stateWithIso = {
    iso: match && match.params.iso,
    ...state
  };

  return {
    comparisonIndicators: getComparisonIndicators(stateWithIso),
    countryName: getCountryName(stateWithIso)
  };
};

export default withRouter(connect(mapStateToProps, null)(Component));
