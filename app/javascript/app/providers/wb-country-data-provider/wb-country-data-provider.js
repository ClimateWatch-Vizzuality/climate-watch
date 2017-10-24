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
    const { match, fetchWbCountryData } = this.props;
    const iso = match.params.iso;
    fetchWbCountryData(iso);
  }

  render() {
    return null;
  }
}

WbCountryDataProvider.propTypes = {
  fetchWbCountryData: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired
};

export default withRouter(connect(null, actions)(WbCountryDataProvider));
