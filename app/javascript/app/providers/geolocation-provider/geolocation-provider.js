import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import actions from './geolocation-provider-actions';
import reducers, { initialState } from './geolocation-provider-reducers';

const { IPSTACK_GEOLOCATION_API_KEY } = process.env;

class GeolocationProvider extends PureComponent {
  componentDidMount() {
    const { requestLocation, locationProvider } = this.props;
    requestLocation(locationProvider);
  }

  render() {
    return null;
  }
}

GeolocationProvider.propTypes = {
  locationProvider: PropTypes.string.isRequired,
  requestLocation: PropTypes.func.isRequired
};

GeolocationProvider.defaultProps = {
  locationProvider: `https://api.ipstack.com/check?access_key=${IPSTACK_GEOLOCATION_API_KEY}&format=1`
};

export { actions, reducers, initialState };
export default connect(null, actions)(GeolocationProvider);
