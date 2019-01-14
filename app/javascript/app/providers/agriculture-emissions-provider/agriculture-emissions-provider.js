import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import actions from './agriculture-emissions-provider-actions';

export { initialState } from './agriculture-emissions-provider-reducers';
export { default as reducers } from './agriculture-emissions-provider-reducers';
export { default as actions } from './agriculture-emissions-provider-actions';

class AgricultureEmissionsProvider extends PureComponent {
  componentDidMount() {
    const { fetchAgricultureEmissions } = this.props;
    fetchAgricultureEmissions();
  }

  render() {
    return null;
  }
}

AgricultureEmissionsProvider.propTypes = {
  fetchAgricultureEmissions: PropTypes.func.isRequired
};

export default connect(null, actions)(AgricultureEmissionsProvider);
