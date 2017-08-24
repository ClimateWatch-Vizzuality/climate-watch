import { createElement } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import NDCCountryComponent from './ndc-country-component';
import actions from './ndc-country-actions';
import { getCountry } from './ndc-country-selectors';

export { default as component } from './ndc-country-component';
export { initialState } from './ndc-country-reducers';
export { default as reducers } from './ndc-country-reducers';
export { default as actions } from './ndc-country-actions';

const mapStateToProps = (state, { match }) => ({
  country: getCountry(state.countrySelect.countries, match.params.iso),
  hasData: !!state.countryNDC.data[match.params.iso]
});

const NDCCountryContainer = (props) => {
  const { hasData, match, fetchCountryNDC } = props;
  const { iso } = match.params;
  if (!hasData && iso) {
    fetchCountryNDC(iso);
  }
  return createElement(NDCCountryComponent, {
    ...props
  });
};

export default withRouter(
  connect(mapStateToProps, actions)(NDCCountryContainer)
);
