import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import {
  getCountryName,
  getCountryDescription,
  getAnchorLinks
} from './country-selectors';

import Component from './country-component';

const mapStateToProps = (state, { location, match, route }) => {
  const iso = match.params.iso;
  const stateWithIso = {
    iso,
    countries: state.countries
  };
  const routeData = {
    iso,
    location,
    route
  };
  return {
    country: {
      iso,
      name: getCountryName(stateWithIso),
      description: getCountryDescription(stateWithIso)
    },
    anchorLinks: getAnchorLinks(routeData)
  };
};

// import allActions from 'app/actions'
// export { default as component } from './other-component'
// export * as reducers from './other-reducers'
// export { default as styles } from './other-styles'
// export { default as actions } from './other-actions'
export default withRouter(connect(mapStateToProps)(Component));
