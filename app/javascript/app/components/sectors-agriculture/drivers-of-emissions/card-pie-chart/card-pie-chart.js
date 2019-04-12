import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { isEmbededComponent } from 'utils/navigation';
import Component from './card-pie-chart-component';
import { getGhgEmissionsFilter } from './ghg-metadata-selectors';
import { getPieChartPayload } from './pie-chart-selectors';

const mapStateToProps = (state, props) => {
  const { location } = props;
  const isEmbed = isEmbededComponent(location);

  return {
    ghgEmissionsFilters: getGhgEmissionsFilter(state, props),
    pieChartData: getPieChartPayload(state, props),
    isEmbed
  };
};

export default withRouter(connect(mapStateToProps, null)(Component));
