import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import actions from './esp-locations-provider-actions';
import reducers, { initialState } from './esp-locations-provider-reducers';

class EspLocationsProvider extends PureComponent {
  componentDidMount() {
    this.props.getEspLocations();
  }

  render() {
    return null;
  }
}

EspLocationsProvider.propTypes = {
  getEspLocations: PropTypes.func.isRequired
};

export { actions, reducers, initialState };
export default connect(null, actions)(EspLocationsProvider);
