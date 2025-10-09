import { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import actions from './actions';
import reducers, { initialState } from './reducers';

const NdcContentGlobalEmissionsProvider = props => {
  const { getGlobalEmissions } = props;

  useEffect(() => {
    getGlobalEmissions();
  }, []);

  return null;
};

NdcContentGlobalEmissionsProvider.propTypes = {
  getGlobalEmissions: PropTypes.func.isRequired
};

export { actions, reducers, initialState };

export default connect(null, actions)(NdcContentGlobalEmissionsProvider);
