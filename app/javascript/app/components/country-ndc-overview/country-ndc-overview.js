import { PureComponent, createElement } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import { withRouter } from 'react-router';
import isEmpty from 'lodash/isEmpty';

import actions from './country-ndc-overview-actions';
import reducers, { initialState } from './country-ndc-overview-reducers';

import CountryNdcOverviewComponent from './country-ndc-overview-component';
import { getValuesGrouped } from './country-ndc-overview-selectors';

const mapStateToProps = (state, { match }) => {
  const { iso } = match.params;
  const overviewData = state.countryNDCOverview.data;
  const countryData = overviewData ? overviewData[iso] : null;
  return {
    iso,
    values: getValuesGrouped(countryData),
    loading: state.countryNDCOverview.loading,
    sectors: countryData ? countryData.sectors : null,
    fetched: !isEmpty(overviewData[iso])
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

  render() {
    return createElement(CountryNdcOverviewComponent, {
      ...this.props
    });
  }
}

CountryNdcOverviewContainer.propTypes = {
  match: Proptypes.object.isRequired,
  loading: Proptypes.bool,
  fetchCountryNdcOverviewData: Proptypes.func,
  fetched: Proptypes.bool
};

export { actions, reducers, initialState };

export default withRouter(
  connect(mapStateToProps, actions)(CountryNdcOverviewContainer)
);
