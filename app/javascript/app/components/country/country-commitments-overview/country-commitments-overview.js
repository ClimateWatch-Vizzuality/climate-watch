import { useEffect, createElement } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import { withRouter } from 'react-router';
import isEmpty from 'lodash/isEmpty';
import { handleAnalytics } from 'utils/analytics';

import { isPageNdcp, isEmbededComponent } from 'utils/navigation';
import { actions } from 'components/modal-metadata';
import { actions as fetchActions } from 'components/ndcs/ndcs-country-accordion';

import CountryCommitmentsOverviewComponent from './country-commitments-overview-component';
import {
  getValuesGrouped,
  getNdcsDocument,
  getLtsDocument,
  getSectors,
  getCountryDocuments,
  getCountryName,
  getCountryNdcsData
} from './country-commitments-overview-selectors';

const mapStateToProps = (state, { location, match }) => {
  const { iso } = match.params;
  const isNdcp = isPageNdcp(location);
  const isEmbed = isEmbededComponent(location);

  return {
    iso,
    isNdcp,
    isEmbed,
    ndcsDocument: getNdcsDocument(state, { location, iso }),
    ltsDocument: getLtsDocument(state, { location, iso }),
    values:
      process.env.FEATURE_COUNTRY_CHANGES === 'true'
        ? getCountryNdcsData(state, { iso })
        : getValuesGrouped(state, { location, iso }),
    loading: state.ndcContentOverview.loading,
    sectors: getSectors(state, { location, iso }),
    fetched: !isEmpty(getCountryDocuments(state, { location, iso })),
    countryName: getCountryName(state, { iso })
  };
};

function CountryCommitmentsOverviewContainer(props) {
  const {
    iso,
    fetchNdcsCountryAccordion,
    setModalMetadata,
    selectedDocument
  } = props;

  useEffect(() => {
    if (selectedDocument) {
      fetchNdcsCountryAccordion({
        locations: iso,
        category: 'summary',
        compare: false,
        lts: false,
        document: selectedDocument.slug
      });
    }
  }, [iso, selectedDocument]);

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

  return createElement(CountryCommitmentsOverviewComponent, {
    ...props,
    handleInfoClick,
    handleAnalyticsClick
  });
}

CountryCommitmentsOverviewContainer.propTypes = {
  setModalMetadata: Proptypes.func.isRequired
};

export default withRouter(
  connect(mapStateToProps, { ...actions, ...fetchActions })(
    CountryCommitmentsOverviewContainer
  )
);
