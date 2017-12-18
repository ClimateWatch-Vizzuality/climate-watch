import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import actions from './esp-locations-provider-actions';
import reducers, { initialState } from './esp-locations-provider-reducers';

class EspLocationsProvider extends PureComponent {
  componentDidMount() {
    const { withTimeSeries } = this.props;
    this.props.getEspLocations(withTimeSeries);
  }

  render() {
    return null;
  }
}

EspLocationsProvider.propTypes = {
  getEspLocations: PropTypes.func.isRequired,
  withTimeSeries: PropTypes.bool
};

export { actions, reducers, initialState };
export default connect(null, actions)(EspLocationsProvider);
