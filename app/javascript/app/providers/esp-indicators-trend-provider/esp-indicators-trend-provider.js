import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import actions from './esp-indicators-trend-provider-actions';
import reducers, {
  initialState
} from './esp-indicators-trend-provider-reducers';

class EspIndicatorsTrendDataProvider extends PureComponent {
  componentDidMount() {
    const { getIndicatorsTrendData, locationId, scenarioId } = this.props;
    getIndicatorsTrendData(locationId, scenarioId);
  }

  componentWillReceiveProps(nextProps) {
    const { getIndicatorsTrendData, locationId, scenarioId } = nextProps;
    if (locationId !== this.props.locationId) {
      getIndicatorsTrendData(locationId, scenarioId);
    }
  }

  render() {
    return null;
  }
}

EspIndicatorsTrendDataProvider.propTypes = {
  getIndicatorsTrendData: PropTypes.func.isRequired,
  locationId: PropTypes.number,
  scenarioId: PropTypes.string
};

export { actions, reducers, initialState };
export default withRouter(
  connect(null, actions)(EspIndicatorsTrendDataProvider)
);
