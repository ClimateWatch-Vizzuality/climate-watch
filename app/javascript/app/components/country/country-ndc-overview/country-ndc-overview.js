import { PureComponent, createElement } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import { withRouter } from 'react-router';
import isEmpty from 'lodash/isEmpty';
import ReactGA from 'react-ga';

import { actions as modalMetadataActions } from 'components/modal-metadata';
import ownActions from './country-ndc-overview-actions';
import reducers, { initialState } from './country-ndc-overview-reducers';

import CountryNdcOverviewComponent from './country-ndc-overview-component';
import { getValuesGrouped } from './country-ndc-overview-selectors';

const actions = {
  ...modalMetadataActions,
  ...ownActions
};

const mapStateToProps = (state, { match }) => {
  const { iso } = match.params;
  const overviewData = state.countryNDCOverview.data;
  const countryData = overviewData ? overviewData[iso] : null;
  return {
    iso,
    values: getValuesGrouped(countryData),
    loading: state.countryNDCOverview.loading,
    sectors: countryData ? countryData.sectors : null,
    fetched: !isEmpty(countryData)
  };
};

class CountryNdcOverviewContainer extends PureComponent {
  componentWillMount() {
    const { match, loading, fetched, fetchCountryNdcOverviewData } = this.props;
    const { iso } = match.params;
    if (iso && !loading && !fetched) {
      fetchCountryNdcOverviewData(iso);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { iso, loading, fetchCountryNdcOverviewData } = this.props;
    const { iso: nextIso } = nextProps;
    if (iso && nextIso && nextIso !== iso && !loading) {
      fetchCountryNdcOverviewData(nextIso);
    }
  }

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
  iso: Proptypes.string,
  match: Proptypes.object.isRequired,
  loading: Proptypes.bool,
  fetchCountryNdcOverviewData: Proptypes.func,
  fetched: Proptypes.bool,
  setModalMetadata: Proptypes.func.isRequired
};

export { actions, reducers, initialState };

export default withRouter(
  connect(mapStateToProps, actions)(CountryNdcOverviewContainer)
);
