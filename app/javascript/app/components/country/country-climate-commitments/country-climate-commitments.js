import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Component from './country-climate-commitments-component';
import {
  getCountriesDocumentsValues,
  getCountryName
} from './country-climate-commitments-selectors';

const mapStateToProps = (state, { match }) => {
  const stateWithIso = {
    iso: match && match.params.iso,
    ...state
  };
  return {
    countriesDocumentsValues: getCountriesDocumentsValues(stateWithIso),
    countryName: getCountryName(stateWithIso)
  };
};

export default withRouter(connect(mapStateToProps, null)(Component));
