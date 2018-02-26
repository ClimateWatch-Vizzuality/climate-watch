import { PureComponent, createElement } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import { withRouter } from 'react-router';
import isEmpty from 'lodash/isEmpty';
import ReactGA from 'react-ga';

import { actions } from 'components/modal-metadata';

import CountryNdcOverviewComponent from './country-ndc-overview-component';
import { getValuesGrouped } from './country-ndc-overview-selectors';

const mapStateToProps = (state, { match }) => {
  const { iso } = match.params;
  const overviewData = state.ndcContentOverview.data.locations;
  const countryData = overviewData ? overviewData[iso] : null;
  return {
    iso,
    values: getValuesGrouped(countryData),
    loading: state.ndcContentOverview.loading,
    sectors: countryData ? countryData.sectors : null,
    fetched: !isEmpty(countryData)
  };
};

class CountryNdcOverviewContainer extends PureComponent {
  handleAnalyticsClick = () => {
    ReactGA.event({
      category: 'Country',
      action: 'Leave page to explore data',
      label: 'Ndc Overview'
    });
  };

  handleInfoClick = () => {
    this.props.setModalMetadata({
      category: 'Country',
      slugs: ['ndc_cait', 'ndc_wb'],
      customTitle: 'Nationally Determined Contribution (NDC) Overview',
      open: true
    });
  };

  render() {
    return createElement(CountryNdcOverviewComponent, {
      ...this.props,
      handleInfoClick: this.handleInfoClick,
      handleAnalyticsClick: this.handleAnalyticsClick
    });
  }
}

CountryNdcOverviewContainer.propTypes = {
  setModalMetadata: Proptypes.func.isRequired
};

export default withRouter(
  connect(mapStateToProps, actions)(CountryNdcOverviewContainer)
);
