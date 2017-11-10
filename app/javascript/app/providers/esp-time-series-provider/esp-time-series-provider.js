import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import actions from './esp-time-series-provider-actions';
import reducers, { initialState } from './esp-time-series-provider-reducers';

class ESPTimeSeriesProvider extends PureComponent {
  componentDidMount() {
    this.props.getESPTimeSeries(this.props.location, this.props.scenario);
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.location !== this.props.location ||
      nextProps.scenario !== this.props.scenario
    ) {
      this.props.getESPTimeSeries(nextProps.location, nextProps.scenario);
    }
  }

  render() {
    return null;
  }
}

ESPTimeSeriesProvider.propTypes = {
  getESPTimeSeries: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  scenario: PropTypes.string
};

export { actions, reducers, initialState };
export default connect(null, actions)(ESPTimeSeriesProvider);
