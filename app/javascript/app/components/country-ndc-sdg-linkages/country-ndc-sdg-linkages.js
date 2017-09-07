import { createElement } from 'react';
// import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CountrySDGLinkagesComponent from './country-ndc-sdg-linkages-component';
import actions from './country-ndc-sdg-linkages-actions';

export { default as component } from './country-ndc-sdg-linkages-component';
export { initialState } from './country-ndc-sdg-linkages-reducers';
export { default as styles } from './country-ndc-sdg-linkages-styles';
export { default as reducers } from './country-ndc-sdg-linkages-reducers';
export { default as actions } from './country-ndc-sdg-linkages-actions';

const mapStateToProps = (state, { match }) => ({
  stateProp: 'State prop',
  sectors: state.countrySDGLinkages.data[match.params.iso]
    ? state.countrySDGLinkages.data[match.params.iso].sectors
    : {},
  sdgs: state.countrySDGLinkages.data[match.params.iso]
    ? state.countrySDGLinkages.data[match.params.iso].sdgs
    : {},
  loading: state.countrySDGLinkages.loading,
  loaded: state.countrySDGLinkages.loaded
});

const CountrySDGLinkagesContainer = props => {
  const { match, fetchNDCsSDGs, loading, loaded } = props;
  const { iso } = match.params;
  if (iso && !loading && !loaded) {
    fetchNDCsSDGs(iso);
  }

  return createElement(CountrySDGLinkagesComponent, {
    ...props
  });
};

// CountrySDGLinkagesContainer.propTypes = {
//   myProp: Proptypes.string
// };

export default withRouter(
  connect(mapStateToProps, actions)(CountrySDGLinkagesContainer)
);
