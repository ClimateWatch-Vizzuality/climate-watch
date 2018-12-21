import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import actions from './latest-updates-provider-actions';
import reducers, { initialState } from './latest-updates-provider-reducers';

class LatestUpdatesProvider extends PureComponent {
  componentDidMount() {
    const { fetchLatestUpdates } = this.props;
    fetchLatestUpdates();
  }

  render() {
    return null;
  }
}

LatestUpdatesProvider.propTypes = {
  fetchLatestUpdates: PropTypes.func.isRequired
};

export { actions, reducers, initialState };
const mapStateToProps = state => ({
  latestUpdates: state.latestUpdates
});
export default withRouter(
  connect(mapStateToProps, actions)(LatestUpdatesProvider)
);
