import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import actions from './agriculture-emissions-provider-actions';

export { initialState } from './agriculture-emissions-provider-reducers';
export { default as reducers } from './agriculture-emissions-provider-reducers';
export { default as actions } from './agriculture-emissions-provider-actions';

class AgricultureEmissionsProvider extends PureComponent {
  componentDidMount() {
    const { fetchAgricultureEmissions, isoCode3 } = this.props;
    fetchAgricultureEmissions(isoCode3);
  }

  componentWillReceiveProps(nextProps) {
    const { isoCode3: newIsoCode3 } = nextProps;
    const { fetchAgricultureEmissions, isoCode3 } = this.props;
    if (newIsoCode3 !== isoCode3) {
      fetchAgricultureEmissions(newIsoCode3);
    }
  }

  render() {
    return null;
  }
}

AgricultureEmissionsProvider.propTypes = {
  fetchAgricultureEmissions: PropTypes.func.isRequired,
  isoCode3: PropTypes.string
};

AgricultureEmissionsProvider.defaultProps = {
  isoCode3: 'AFG'
};

export default connect(null, actions)(AgricultureEmissionsProvider);
