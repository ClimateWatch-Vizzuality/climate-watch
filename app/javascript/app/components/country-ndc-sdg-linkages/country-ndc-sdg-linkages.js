import { createElement } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getLocationParamUpdated } from 'utils/navigation';
import qs from 'query-string';
import isEmpty from 'lodash/isEmpty';
import actions from './country-ndc-sdg-linkages-actions';
import reducers, { initialState } from './country-ndc-sdg-linkages-reducers';

import CountrySDGLinkagesComponent from './country-ndc-sdg-linkages-component';
import {
  getSectorOptionsSorted,
  groupTargetsMeta,
  getSectorSelected,
  getSectorsMapped
} from './country-ndc-sdg-linkages-selectors';

const mapStateToProps = (state, { match, location }) => {
  const { countrySDGLinkages, ndcsSdgsMeta, ndcsSdgsData } = state;
  const { iso } = match.params;
  const search = qs.parse(location.search);
  const sdgsData = {
    data: ndcsSdgsMeta.data,
    activeSector: search.sector
  };

  return {
    fetched: ndcsSdgsData.data[iso],
    activeSector: getSectorSelected(sdgsData),
    tooltipData: countrySDGLinkages.tooltipData,
    sectors: getSectorsMapped(sdgsData),
    sectorOptions: getSectorOptionsSorted(sdgsData),
    goals: (!isEmpty(ndcsSdgsData.data) && ndcsSdgsMeta.data.goals) || [],
    targets: groupTargetsMeta(ndcsSdgsMeta),
    targetsData:
      !isEmpty(ndcsSdgsData.data) && ndcsSdgsData.data[iso]
        ? ndcsSdgsData.data[iso].sdgs
        : {},
    loading: !ndcsSdgsData.error && ndcsSdgsData.loading,
    infoOpen: countrySDGLinkages.infoOpen
  };
};

const CountrySDGLinkagesContainer = props => {
  const { history, location } = props;

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

export { actions, reducers, initialState };

export default withRouter(
  connect(mapStateToProps, actions)(CountrySDGLinkagesContainer)
);
