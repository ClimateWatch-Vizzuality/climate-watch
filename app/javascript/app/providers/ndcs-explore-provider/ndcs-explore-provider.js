import { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import reducers, { initialState } from './ndcs-explore-provider-reducers';
import actions from './ndcs-explore-provider-actions';

const NDCSExploreProvider = props => {
  const { fetchNDCS, subcategory, document } = props;

  useEffect(() => {
    fetchNDCS({
      subcategory,
      document
    });
  }, [subcategory, document]);

  return null;
};

NDCSExploreProvider.propTypes = {
  fetchNDCS: PropTypes.func.isRequired
};
export { actions, reducers, initialState };

export default connect(null, actions)(NDCSExploreProvider);
