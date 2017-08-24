import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Component from './ndc-country-component';
import actions from './ndc-country-actions';

export { default as component } from './ndc-country-component';
export { initialState } from './ndc-country-reducers';
export { default as reducers } from './ndc-country-reducers';
export { default as actions } from './ndc-country-actions';

const getCountry = (countries, iso) =>
  countries.filter(country => country.value === iso)[0];

const mapStateToProps = (state, { match }) => ({
  country: getCountry(state.countrySelect.countries, match.params.iso),
  hasData: !!state.countryNDC.data[match.params.iso]
});

export default withRouter(connect(mapStateToProps, actions)(Component));
