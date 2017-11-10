import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import actions from './esp-time-series-provider-actions';
import reducers, { initialState } from './esp-time-series-provider-reducers';

class ESPTimeSeriesProvider extends PureComponent {
  componentDidMount() {
    this.props.getESPTimeSeries(this.props.location);
  }

  render() {
    return null;
  }
}

ESPTimeSeriesProvider.propTypes = {
  getESPTimeSeries: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired
};

export { actions, reducers, initialState };
export default connect(null, actions)(ESPTimeSeriesProvider);
