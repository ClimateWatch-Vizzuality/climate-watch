import { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import actions from './metadata-provider-actions';
import reducers, { initialState } from './metadata-provider-reducers';

const MetadataProvider = props => {
  const { source, getMetadata } = props;

  useEffect(() => {
    getMetadata({ source });
  }, [source]);

  return null;
};

MetadataProvider.propTypes = {
  getMetadata: PropTypes.func.isRequired
};

export { actions, reducers, initialState };

export default connect(null, actions)(MetadataProvider);
