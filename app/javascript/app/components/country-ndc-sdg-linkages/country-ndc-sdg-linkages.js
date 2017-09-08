import { createElement } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CountrySDGLinkagesComponent from './country-ndc-sdg-linkages-component';
import actions from './country-ndc-sdg-linkages-actions';

export { default as component } from './country-ndc-sdg-linkages-component';
export { initialState } from './country-ndc-sdg-linkages-reducers';
export { default as styles } from './country-ndc-sdg-linkages-styles';
export { default as reducers } from './country-ndc-sdg-linkages-reducers';
export { default as actions } from './country-ndc-sdg-linkages-actions';

const mapStateToProps = (state, { match }) => {
  const { countrySDGLinkages } = state;
  const { iso } = match.params;
  return {
    fetched: countrySDGLinkages.data[iso],
    sectors: countrySDGLinkages.data[iso]
      ? countrySDGLinkages.data[iso].sectors
      : {},
    sdgs: countrySDGLinkages.data[iso] ? countrySDGLinkages.data[iso].sdgs : {},
    loading: countrySDGLinkages.loading
  };
};

const CountrySDGLinkagesContainer = props => {
  const { match, fetchNDCsSDGs, loading, fetched } = props;
  const { iso } = match.params;
  if (iso && !loading && !fetched) {
    fetchNDCsSDGs(iso);
  }

  return createElement(CountrySDGLinkagesComponent, {
    ...props
  });
};

export default withRouter(
  connect(mapStateToProps, actions)(CountrySDGLinkagesContainer)
);
