import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import actions from './esp-time-series-provider-actions';
import reducers, { initialState } from './esp-time-series-provider-reducers';

class EspTimeSeriesProvider extends PureComponent {
  componentDidMount() {
    this.props.getEspTimeSeries(this.props.location, this.props.scenario);
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.location !== this.props.location ||
      nextProps.scenario !== this.props.scenario
    ) {
      this.props.getEspTimeSeries(nextProps.location, nextProps.scenario);
    }
  }

  render() {
    return null;
  }
}

EspTimeSeriesProvider.propTypes = {
  getEspTimeSeries: PropTypes.func.isRequired,
  location: PropTypes.string.isRequired,
  scenario: PropTypes.string.isRequired
};

export { actions, reducers, initialState };
export default connect(null, actions)(EspTimeSeriesProvider);
