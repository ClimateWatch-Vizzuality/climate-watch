import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { actions } from 'components/anchor-nav';

import {
  getCountryName,
  getDescriptionText,
  getLegacyDescriptionText,
  getAnchorLinks,
  getEmissionProviderFilters
} from './country-selectors';

import Component from './country-component';

const FEATURE_COUNTRY_CHANGES = process.env.FEATURE_COUNTRY_CHANGES === 'true';

const mapStateToProps = (state, { location, match, route }) => {
  const iso = match.params.iso;
  const { data } = state.socioeconomics;
  const stateWithIso = {
    iso,
    countries: state.countries,
    socioeconomics: data ? data[iso] : {},
    ...state
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
    description: FEATURE_COUNTRY_CHANGES
      ? getDescriptionText(stateWithIso)
      : getLegacyDescriptionText(stateWithIso),
    anchorLinks: getAnchorLinks(routeData),
    emissionProviderFilters: getEmissionProviderFilters(stateWithIso)
  };
};

export default withRouter(connect(mapStateToProps, actions)(Component));
