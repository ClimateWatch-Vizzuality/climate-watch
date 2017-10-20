import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import actions from './countries-provider-actions';
import reducers, { initialState } from './countries-provider-reducers';

class GeolocationProvider extends PureComponent {
  componentDidMount() {
    this.props.getCountries();
  }

  render() {
    return null;
  }
}

GeolocationProvider.propTypes = {
  getCountries: PropTypes.func.isRequired
};

export const redux = {
  actions,
  reducers,
  initialState
};
export default connect(null, actions)(GeolocationProvider);
