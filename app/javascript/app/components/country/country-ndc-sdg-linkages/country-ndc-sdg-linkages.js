import { createElement } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  getLocationParamUpdated,
  isPageNdcp,
  isPageContained,
  isEmbededComponent
} from 'utils/navigation';
import qs from 'query-string';
import isEmpty from 'lodash/isEmpty';
import { handleAnalytics } from 'utils/analytics';
import { actions as modalMetadataActions } from 'components/modal-metadata';

import ownActions from './country-ndc-sdg-linkages-actions';
import reducers, { initialState } from './country-ndc-sdg-linkages-reducers';

import CountrySDGLinkagesComponent from './country-ndc-sdg-linkages-component';
import {
  getSectorOptionsSorted,
  groupTargetsMeta,
  getSectorSelected,
  getSectorsMapped,
  getTooltipSectorIds
} from './country-ndc-sdg-linkages-selectors';

const actions = {
  ...modalMetadataActions,
  ...ownActions
};

const mapStateToProps = (state, { match, location }) => {
  const { countrySDGLinkages, ndcsSdgsMeta, ndcsSdgsData } = state;
  const { iso } = match.params;
  const search = qs.parse(location.search);
  const isNdcp = isPageNdcp(location) || isPageContained;
  const isEmbed = isEmbededComponent(location);
  const tooltipData = countrySDGLinkages.tooltipData;
  const targetsData =
    !isEmpty(ndcsSdgsData.data) && ndcsSdgsData.data[iso]
      ? ndcsSdgsData.data[iso].sdgs
      : {};
  const sdgsData = {
    data: ndcsSdgsMeta.data,
    activeSector: search.sector,
    tooltipData,
    targetsData
  };
  return {
    fetched: ndcsSdgsData.data[iso],
    activeSector: getSectorSelected(sdgsData),
    tooltipData,
    sectors: getSectorsMapped(sdgsData),
    tooltipSectorIds: getTooltipSectorIds(sdgsData),
    sectorOptions: getSectorOptionsSorted(sdgsData),
    goals: (!isEmpty(ndcsSdgsData.data) && ndcsSdgsMeta.data.goals) || [],
    targets: groupTargetsMeta(ndcsSdgsMeta),
    targetsData,
    loading:
      (!ndcsSdgsData.error && ndcsSdgsData.loading) || ndcsSdgsMeta.loading,
    iso,
    isNdcp,
    isEmbed
  };
};

const CountrySDGLinkagesContainer = props => {
  const { history, location } = props;

  const handleAnalyticsClick = () => {
    handleAnalytics(
      'Country',
      'Leave page to explore data',
      'Ndc Sdg Linkages'
    );
  };

  const handleInfoClick = () => {
    props.setModalMetadata({
      category: 'Country',
      slugs: 'ndc_sdg_all indicators',
      open: true
    });
  };

  const handleOnDotClick = (targetNumber, targetData) => {
    const { iso } = props;
    if (iso && targetNumber) {
      const { document_type, language } = targetData;
      const path = `/ndcs/country/${iso}/full?query=${targetNumber}&searchBy=target&document=${document_type}-${language}`;
      history.push(path);
    }
  };

  const handleSectorChange = option => {
    updateUrlParam({ name: 'sector', value: option ? option.value : '' });
    if (option) {
      handleAnalytics('Country', 'Change SDG-NDC sector', option.label);
    }
  };

  const updateUrlParam = (params, clear) => {
    history.replace(getLocationParamUpdated(location, params, clear));
  };

  return createElement(CountrySDGLinkagesComponent, {
    ...props,
    handleSectorChange,
    handleInfoClick,
    handleAnalyticsClick,
    handleOnDotClick
  });
};

export { actions, reducers, initialState };

export default withRouter(
  connect(mapStateToProps, actions)(CountrySDGLinkagesContainer)
);
