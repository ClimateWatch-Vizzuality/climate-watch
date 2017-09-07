import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import {
  getCountryName,
  getCountryDescription,
  getAnchorLinks
} from './country-selectors';

import Component from './country-component';

const mapStateToProps = (state, location) => {
  const iso = location.match.params.iso;
  const stateWithIso = {
    iso,
    countries: state.countries
  };

  return {
    country: {
      iso,
      name: getCountryName(stateWithIso),
      description: getCountryDescription(stateWithIso)
    },
    anchorLinks: getAnchorLinks(location)
  };
};

// import allActions from 'app/actions'
// export { default as component } from './other-component'
// export * as reducers from './other-reducers'
// export { default as styles } from './other-styles'
// export { default as actions } from './other-actions'
export default withRouter(connect(mapStateToProps)(Component));
