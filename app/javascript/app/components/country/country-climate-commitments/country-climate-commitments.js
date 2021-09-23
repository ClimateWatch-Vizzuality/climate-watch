import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Component from './country-climate-commitments-component';
import {
  getPreviousComparisonCountryValues,
  getCountriesDocumentsValues,
  getCountryName
} from './country-climate-commitments-selectors';

const mapStateToProps = (state, { match }) => {
  const stateWithIso = {
    iso: match && match.params.iso,
    ...state
  };
  return {
    countryName: getCountryName(stateWithIso),
    previousComparisonValues: getPreviousComparisonCountryValues(stateWithIso),
    countriesDocumentsValues: getCountriesDocumentsValues(stateWithIso)
  };
};

export default withRouter(connect(mapStateToProps, null)(Component));