import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import qs from 'query-string';

import KeyVisualizationCard from './key-visualization-card-component';

const mapStateToProps = (state, { location }) => {
  const search = qs.parse(location.search);

  return {
    state,
    search
  };
};

export default withRouter(connect(mapStateToProps, null)(KeyVisualizationCard));
