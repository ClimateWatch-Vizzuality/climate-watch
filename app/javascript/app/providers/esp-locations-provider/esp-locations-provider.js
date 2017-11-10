import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import actions from './esp-locations-provider-actions';
import reducers, { initialState } from './esp-locations-provider-reducers';

class ESPLocationsProvider extends PureComponent {
  componentDidMount() {
    this.props.getESPLocations();
  }

  render() {
    return null;
  }
}

ESPLocationsProvider.propTypes = {
  getESPLocations: PropTypes.func.isRequired
};

export { actions, reducers, initialState };
export default connect(null, actions)(ESPLocationsProvider);
