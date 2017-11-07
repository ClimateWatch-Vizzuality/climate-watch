import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import actions from './wb-country-data-provider-actions';

export { initialState } from './wb-country-data-provider-reducers';
export { default as reducers } from './wb-country-data-provider-reducers';
export { default as actions } from './wb-country-data-provider-actions';

class WbCountryDataProvider extends PureComponent {
  componentDidMount() {
    const { fetchWbCountryData } = this.props;
    fetchWbCountryData();
  }

  render() {
    return null;
  }
}

WbCountryDataProvider.propTypes = {
  fetchWbCountryData: PropTypes.func.isRequired
};

export default withRouter(connect(null, actions)(WbCountryDataProvider));
