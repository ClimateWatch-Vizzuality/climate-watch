import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import actions from './esp-time-series-provider-actions';
import reducers, { initialState } from './esp-time-series-provider-reducers';

class EspTimeSeriesProvider extends PureComponent {
  componentDidMount() {
    const { location, model, scenario, getEspTimeSeries } = this.props;
    getEspTimeSeries(location, model, scenario);
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.location !== this.props.location ||
      nextProps.scenario !== this.props.scenario
    ) {
      const { location, model, scenario, getEspTimeSeries } = nextProps;
      getEspTimeSeries(location, model, scenario);
    }
  }

  render() {
    return null;
  }
}

EspTimeSeriesProvider.propTypes = {
  getEspTimeSeries: PropTypes.func.isRequired,
  location: PropTypes.string.isRequired,
  model: PropTypes.string,
  scenario: PropTypes.string
};

export { actions, reducers, initialState };
export default connect(null, actions)(EspTimeSeriesProvider);
