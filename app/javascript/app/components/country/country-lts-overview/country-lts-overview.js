import { PureComponent, createElement } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import { withRouter } from 'react-router';
import isEmpty from 'lodash/isEmpty';
import { handleAnalytics } from 'utils/analytics';

import { isPageNdcp, isEmbededComponent } from 'utils/navigation';
import { actions } from 'components/modal-metadata';

import CountryLtsOverviewComponent from './country-lts-overview-component';
import { getValuesGrouped } from './country-lts-overview-selectors';

const mapStateToProps = (state, { location, match }) => {
  const { iso } = match.params;
  const overviewData =
    state.ndcContentOverview.data && state.ndcContentOverview.data.locations;
  const countryData = overviewData ? overviewData[iso] : null;
  const isNdcp = isPageNdcp(location);
  const isEmbed = isEmbededComponent(location);
  return {
    iso,
    isNdcp,
    isEmbed,
    values: getValuesGrouped(countryData),
    loading: state.ndcContentOverview.loading,
    sectors: countryData ? countryData.sectors : null,
    fetched: !isEmpty(countryData)
  };
};

class CountryLtsOverviewContainer extends PureComponent {
  handleAnalyticsClick = () => {
    handleAnalytics('Country', 'Leave page to explore data', 'Ndc Overview');
  };

  handleInfoClick = () => {
    this.props.setModalMetadata({
      category: 'Country',
      slugs: ['ndc_cw', 'ndc_wb', 'ndc_die'],
      customTitle: 'Nationally Determined Contribution (NDC) Overview',
      open: true
    });
  };

  render() {
    return createElement(CountryLtsOverviewComponent, {
      ...this.props,
      handleInfoClick: this.handleInfoClick,
      handleAnalyticsClick: this.handleAnalyticsClick
    });
  }
}

CountryLtsOverviewContainer.propTypes = {
  setModalMetadata: Proptypes.func.isRequired
};

export default withRouter(
  connect(mapStateToProps, actions)(CountryLtsOverviewContainer)
);
