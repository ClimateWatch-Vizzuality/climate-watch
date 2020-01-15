import { useEffect, createElement } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import { withRouter } from 'react-router';
import isEmpty from 'lodash/isEmpty';
import { handleAnalytics } from 'utils/analytics';

import { isPageNdcp, isEmbededComponent } from 'utils/navigation';
import { actions } from 'components/modal-metadata';
import { actions as fetchActions } from 'components/ndcs/ndcs-country-accordion';

import CountryNdcOverviewComponent from './country-ndc-overview-component';
import {
  getValuesGrouped,
  getLastDocument
} from './country-ndc-overview-selectors';

const mapStateToProps = (state, { location, match }) => {
  const { iso } = match.params;
  const overviewData =
    state.ndcContentOverview.data && state.ndcContentOverview.data.locations;
  const countryData = overviewData ? overviewData[iso] : null;
  const isNdcp = isPageNdcp(location);
  const isEmbed = isEmbededComponent(location);
  const documentsData = {
    iso,
    documents: state.ndcsDocumentsMeta.data
  };
  return {
    iso,
    isNdcp,
    isEmbed,
    lastDocument: getLastDocument(documentsData),
    values: getValuesGrouped(countryData),
    loading: state.ndcContentOverview.loading,
    sectors: countryData ? countryData.sectors : null,
    fetched: !isEmpty(countryData)
  };
};

function CountryNdcOverviewContainer(props) {
  const { iso, fetchNdcsCountryAccordion, setModalMetadata } = props;

  useEffect(() => {
    fetchNdcsCountryAccordion({
      locations: iso,
      category: 'summary',
      compare: false,
      lts: false
    });
  }, [iso]);

  const handleAnalyticsClick = () => {
    handleAnalytics('Country', 'Leave page to explore data', 'Ndc Overview');
  };

  const handleInfoClick = () => {
    setModalMetadata({
      category: 'Country',
      slugs: ['ndc_cw', 'ndc_wb', 'ndc_die'],
      customTitle: 'Nationally Determined Contribution (NDC) Overview',
      open: true
    });
  };

  return createElement(CountryNdcOverviewComponent, {
    ...props,
    handleInfoClick,
    handleAnalyticsClick
  });
}

CountryNdcOverviewContainer.propTypes = {
  setModalMetadata: Proptypes.func.isRequired
};

export default withRouter(
  connect(mapStateToProps, { ...actions, ...fetchActions })(
    CountryNdcOverviewContainer
  )
);
