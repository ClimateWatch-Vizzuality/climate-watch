import { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import reducers, {
  initialState
} from './ndcs-previous-comparison-provider-reducers';
import actions from './ndcs-previous-comparison-provider-actions';

const NDCSExploreProvider = props => {
  const { fetchPreviousNDCComparison, document } = props;

  useEffect(() => {
    fetchPreviousNDCComparison({ document });
  }, [document]);

  return null;
};

NDCSExploreProvider.propTypes = {
  fetchPreviousNDCComparison: PropTypes.func.isRequired
};
export { actions, reducers, initialState };

export default connect(null, actions)(NDCSExploreProvider);
