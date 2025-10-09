import { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import reducers, {
  initialState
} from './ndcs-2025-comparison-provider-reducers';
import actions from './ndcs-2025-comparison-provider-actions';

const NDCS2025ComparisonProvider = props => {
  const { fetch2025NDCComparison, document } = props;

  useEffect(() => {
    fetch2025NDCComparison({ document });
  }, [document]);

  return null;
};

NDCS2025ComparisonProvider.propTypes = {
  fetch2025NDCComparison: PropTypes.func.isRequired
};
export { actions, reducers, initialState };

export default connect(null, actions)(NDCS2025ComparisonProvider);
