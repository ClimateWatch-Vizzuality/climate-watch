import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import isoCountries from 'app/data/iso-countries';

import Component from './ndc-country-component';
import actions from './ndc-country-actions';

export { default as component } from './ndc-country-component';
export { initialState } from './ndc-country-reducers';
export { default as reducers } from './ndc-country-reducers';
export { default as actions } from './ndc-country-actions';

const mapStateToProps = (state, { match }) => ({
  countryName: isoCountries[match.params.iso] || 'Country',
  hasData: !!state.countryNDC.data[match.params.iso]
});

export default withRouter(connect(mapStateToProps, actions)(Component));
