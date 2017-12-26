import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import MyClimateWatchComponent from './my-climate-watch-component';

const mapStateToProps = ({ login }) => ({
  login
});

export default withRouter(
  connect(mapStateToProps, null)(MyClimateWatchComponent)
);
