import ReactGA from 'react-ga';
import { PureComponent, createElement } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import qs from 'query-string';

import Component from './compare-ndc-content-overview-component';
import { getSelectedLocationsFilter } from './compare-ndc-content-overview-selectors';

const mapStateToProps = (state, { location }) => {
  const search = qs.parse(location.search);
  const ndcOverviewData = {
    search,
    selectedLocations: search.locations,
    countriesData: state.countries.data
  };
  return {
    selectedLocations: search.locations,
    selectedLocationsFilter: getSelectedLocationsFilter(ndcOverviewData)
  };
};

class CompareNDCContentOverview extends PureComponent {
  handleAnalyticsClick = () => {
    ReactGA.event({
      category: 'Compare',
      action: 'Leave page to NDC compare data',
      label: 'NDC content overview'
    });
  };

  render() {
    return createElement(Component, {
      ...this.props,
      handleAnalyticsClick: this.handleAnalyticsClick
    });
  }
}

export default withRouter(
  connect(mapStateToProps, null)(CompareNDCContentOverview)
);
