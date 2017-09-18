import { PureComponent } from 'react';
import PropTypes from 'prop-types';

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

export default GeolocationProvider;
