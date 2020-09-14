import { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import reducers, { initialState } from './ndcs-provider-reducers';
import actions from './ndcs-provider-actions';

const NDCSProvider = props => {
  const {
    fetchNDCS,
    overrideFilter,
    indicatorSlugs,
    additionalIndicatorSlugs,
    subcategory,
    document
  } = props;
  useEffect(() => {
    fetchNDCS({
      overrideFilter,
      indicatorSlugs,
      additionalIndicatorSlugs,
      subcategory,
      document
    });
  }, [subcategory]);

  return null;
};

NDCSProvider.propTypes = {
  fetchNDCS: PropTypes.func.isRequired
};
export { actions, reducers, initialState };

export default connect(null, actions)(NDCSProvider);
