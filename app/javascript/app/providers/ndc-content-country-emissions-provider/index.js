import { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import actions from './actions';
import reducers, { initialState } from './reducers';

const NdcContentCountryEmissionsProvider = props => {
  const { getCountryEmissions } = props;

  useEffect(() => {
    getCountryEmissions();
  }, []);

  return null;
};

NdcContentCountryEmissionsProvider.propTypes = {
  getCountryEmissions: PropTypes.func.isRequired
};

export { actions, reducers, initialState };

export default connect(null, actions)(NdcContentCountryEmissionsProvider);
