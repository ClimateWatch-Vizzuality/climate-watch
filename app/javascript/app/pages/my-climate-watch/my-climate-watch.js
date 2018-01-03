import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import { actions } from 'components/my-climate-watch/viz-creator';

import MyClimateWatchComponent from './my-climate-watch-component';

const mapStateToProps = ({ login }) => ({
  login
});

export default withRouter(
  connect(mapStateToProps, actions)(MyClimateWatchComponent)
);
