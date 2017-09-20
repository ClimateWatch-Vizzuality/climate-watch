import { createElement } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CountrySDGLinkagesComponent from './country-ndc-sdg-linkages-component';
import actions from './country-ndc-sdg-linkages-actions';
import {
  getSectorOptionsSorted,
  filterSDGs
} from './country-ndc-sdg-linkages-selectors';

export { default as component } from './country-ndc-sdg-linkages-component';
export { initialState } from './country-ndc-sdg-linkages-reducers';
export { default as styles } from './country-ndc-sdg-linkages-styles';
export { default as reducers } from './country-ndc-sdg-linkages-reducers';
export { default as actions } from './country-ndc-sdg-linkages-actions';

const mapStateToProps = (state, { match }) => {
  const { countrySDGLinkages } = state;
  const { iso } = match.params;
  const sdgsData = {
    data: countrySDGLinkages.data[iso],
    activeSector: countrySDGLinkages.activeSector
  };
  return {
    fetched: countrySDGLinkages.data[iso],
    activeSector: countrySDGLinkages.activeSector,
    tooltipData: countrySDGLinkages.tooltipData,
    sectors: countrySDGLinkages.data[iso]
      ? countrySDGLinkages.data[iso].sectors
      : {},
    sectorOptions: getSectorOptionsSorted(countrySDGLinkages.data[iso]),
    sdgs: filterSDGs(sdgsData),
    loading: countrySDGLinkages.loading
  };
};

const CountrySDGLinkagesContainer = props => {
  const { match, fetchNDCsSDGs, loading, fetched, setActiveSector } = props;
  const { iso } = match.params;
  if (iso && !loading && !fetched) {
    fetchNDCsSDGs(iso);
  }

  const handleSectorChange = option => {
    setActiveSector(option);
  };

  return createElement(CountrySDGLinkagesComponent, {
    ...props,
    handleSectorChange
  });
};

export default withRouter(
  connect(mapStateToProps, actions)(CountrySDGLinkagesContainer)
);
