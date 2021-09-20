import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Component from './country-climate-commitments-component';
import {
  getPreviousComparisonCountryValues,
  getCountriesDocumentsValues
} from './country-climate-commitments-selectors';

const mapStateToProps = (state, { match }) => {
  const stateWithIso = {
    iso: match && match.params.iso,
    ...state
  };
  return {
    indicators: getPreviousComparisonCountryValues(stateWithIso),
    countriesDocuments: getCountriesDocumentsValues(stateWithIso)
  };
};

export default withRouter(connect(mapStateToProps, null)(Component));
