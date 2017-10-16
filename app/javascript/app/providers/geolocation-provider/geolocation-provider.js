import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import actions from './geolocation-provider-actions';

export { initialState } from './geolocation-provider-reducers';
export { default as reducers } from './geolocation-provider-reducers';
export { default as actions } from './geolocation-provider-actions';

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
  locationProvider: 'http://ip-api.com/json'
};

export default connect(null, actions)(GeolocationProvider);
