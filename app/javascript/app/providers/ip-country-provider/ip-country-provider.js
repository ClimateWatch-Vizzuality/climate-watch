import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import reducers, { initialState } from './ip-country-provider-reducers';
import * as actions from './ip-country-provider-actions';

class IPCountryProvider extends PureComponent {
  componentDidMount() {
    const { fetchIPCountry } = this.props;
    fetchIPCountry();
  }

  render() {
    return null;
  }
}

IPCountryProvider.propTypes = {
  fetchIPCountry: PropTypes.func.isRequired
};

export { actions, reducers, initialState };

export default connect(null, actions)(IPCountryProvider);
