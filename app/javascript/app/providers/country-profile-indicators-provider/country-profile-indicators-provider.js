import { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import actions from './country-profile-indicators-provider-actions';

export { initialState } from './country-profile-indicators-provider-reducers';
export { default as reducers } from './country-profile-indicators-provider-reducers';
export { default as actions } from './country-profile-indicators-provider-actions';

const CountryProfileIndicatorsProvider = props => {
  const { fetchIndicators, indicatorSlugs, locations } = props;
  const slugs = indicatorSlugs.join(',');
  const locs = locations.join(',');

  useEffect(() => {
    fetchIndicators({ indicatorSlugs, locations });
  }, [slugs, locs]);

  return null;
};

CountryProfileIndicatorsProvider.propTypes = {
  fetchIndicators: PropTypes.func.isRequired,
  indicatorSlugs: PropTypes.arrayOf(PropTypes.string),
  locations: PropTypes.arrayOf(PropTypes.string)
};

export default connect(null, actions)(CountryProfileIndicatorsProvider);
