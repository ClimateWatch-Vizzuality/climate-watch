import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import actions from './agriculture-emissions-provider-actions';

export { initialState } from './agriculture-emissions-provider-reducers';
export { default as reducers } from './agriculture-emissions-provider-reducers';
export { default as actions } from './agriculture-emissions-provider-actions';

class AgricultureEmissionsProvider extends PureComponent {
  componentDidMount() {
    const { fetchAgricultureEmissions, emissionsCountry } = this.props;
    fetchAgricultureEmissions(emissionsCountry);
  }

  componentWillReceiveProps(nextProps) {
    const { emissionsCountry: emissionsCountryNew } = nextProps;
    const { fetchAgricultureEmissions, emissionsCountry } = this.props;
    if (emissionsCountryNew !== emissionsCountry) {
      fetchAgricultureEmissions(emissionsCountryNew);
    }
  }

  render() {
    return null;
  }
}

AgricultureEmissionsProvider.propTypes = {
  fetchAgricultureEmissions: PropTypes.func.isRequired,
  emissionsCountry: PropTypes.string
};

AgricultureEmissionsProvider.defaultProps = {
  emissionsCountry: 'AFG'
};

export default connect(null, actions)(AgricultureEmissionsProvider);
