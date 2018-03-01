import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import actions from './esp-time-series-provider-actions';
import reducers, { initialState } from './esp-time-series-provider-reducers';

class EspTimeSeriesProvider extends PureComponent {
  componentDidMount() {
    const { location, model, getEspTimeSeries } = this.props;
    getEspTimeSeries(location, model);
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.location !== this.props.location ||
      nextProps.model !== this.props.model
    ) {
      const { location, model, getEspTimeSeries } = nextProps;
      getEspTimeSeries(location, model);
    }
  }

  render() {
    return null;
  }
}

EspTimeSeriesProvider.propTypes = {
  getEspTimeSeries: PropTypes.func.isRequired,
  location: PropTypes.number.isRequired,
  model: PropTypes.number
};

export { actions, reducers, initialState };
export default connect(null, actions)(EspTimeSeriesProvider);
