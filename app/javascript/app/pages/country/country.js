import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import {
  getCountryName,
  getDescriptionText,
  getAnchorLinks
} from './country-selectors';

import Component from './country-component';

const mapStateToProps = (state, { location, match, route, isContained }) => {
  const iso = match.params.iso;
  const { data } = state.socioeconomics;
  const stateWithIso = {
    iso,
    countries: state.countries,
    socioeconomics: data ? data[iso] : {}
  };

  const routeData = {
    iso,
    location,
    route
  };

  return {
    country: {
      iso,
      name: getCountryName(stateWithIso)
    },
    description: getDescriptionText(stateWithIso),
    anchorLinks: getAnchorLinks(routeData),
    isContained
  };
};

export default withRouter(connect(mapStateToProps)(Component));
