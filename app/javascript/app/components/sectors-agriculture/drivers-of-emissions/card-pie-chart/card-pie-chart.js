import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Component from './card-pie-chart-component';
import { getGhgEmissionsFilter } from './ghg-metadata-selectors';
import { getPieChartPayload } from './pie-chart-selectors';

const mapStateToProps = (state, props) => ({
  ghgEmissionsFilters: getGhgEmissionsFilter(state, props),
  pieChartData: getPieChartPayload(state, props)
});

export default withRouter(connect(mapStateToProps, null)(Component));
