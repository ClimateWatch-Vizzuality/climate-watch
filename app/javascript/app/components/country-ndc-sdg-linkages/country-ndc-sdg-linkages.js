import { createElement } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getLocationParamUpdated } from 'utils/navigation';
import qs from 'query-string';

import actions from './country-ndc-sdg-linkages-actions';
import reducers, { initialState } from './country-ndc-sdg-linkages-reducers';

import CountrySDGLinkagesComponent from './country-ndc-sdg-linkages-component';
import {
  getSectorOptionsSorted,
  filterSDGs,
  getSectorSelected,
  parsedNdcsSdgs
} from './country-ndc-sdg-linkages-selectors';

const mapStateToProps = (state, { match, location }) => {
  const { countrySDGLinkages, ndcsSdgsMeta } = state;
  const { iso } = match.params;
  const search = qs.parse(location.search);
  const sdgsData = {
    data: countrySDGLinkages.data[iso],
    activeSector: search.sector
  };
  return {
    fetched: countrySDGLinkages.data[iso],
    activeSector: getSectorSelected(sdgsData),
    tooltipData: countrySDGLinkages.tooltipData,
    sectors: countrySDGLinkages.data[iso]
      ? countrySDGLinkages.data[iso].sectors
      : {},
    sectorOptions: getSectorOptionsSorted(sdgsData),
    sdgs: filterSDGs(sdgsData),
    targetsMeta: parsedNdcsSdgs(ndcsSdgsMeta),
    loading: countrySDGLinkages.loading,
    infoOpen: countrySDGLinkages.infoOpen
  };
};

const CountrySDGLinkagesContainer = props => {
  const { match, fetchNDCsSDGs, loading, fetched, history, location } = props;
  const { iso } = match.params;
  if (iso && !loading && !fetched) {
    fetchNDCsSDGs(iso);
  }

  const handleSectorChange = option => {
    updateUrlParam({ name: 'sector', value: option ? option.value : '' });
  };

  const updateUrlParam = (params, clear) => {
    history.replace(getLocationParamUpdated(location, params, clear));
  };

  return createElement(CountrySDGLinkagesComponent, {
    ...props,
    handleSectorChange
  });
};

export const redux = {
  actions,
  reducers,
  initialState
};

export default withRouter(
  connect(mapStateToProps, actions)(CountrySDGLinkagesContainer)
);
