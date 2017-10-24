import { PureComponent, createElement } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import { withRouter } from 'react-router';

import actions from './country-ndc-overview-actions';
import reducers, { initialState } from './country-ndc-overview-reducers';

import CountryNdcOverviewComponent from './country-ndc-overview-component';
import { getValuesGrouped } from './country-ndc-overview-selectors';

const mapStateToProps = (state, { match }) => {
  const { iso } = match.params;
  const countryData = state.countryNDCOverview.data[iso] || null;
  return {
    iso,
    values: getValuesGrouped(countryData),
    sectors: state.countryNDCOverview.data[iso]
      ? state.countryNDCOverview.data[iso].sectors
      : null
  };
};

class CountryNdcOverviewContainer extends PureComponent {
  componentWillMount() {
    const { match, loading, fetchCountryNdcOverviewData } = this.props;
    const { iso } = match.params;
    if (iso && !loading) {
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
  fetchCountryNdcOverviewData: Proptypes.func
};

export { actions, reducers, initialState };

export default withRouter(
  connect(mapStateToProps, actions)(CountryNdcOverviewContainer)
);
