import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { actions } from 'components/anchor-nav';

import {
  getCountryName,
  getDescriptionText,
  getLegacyDescriptionText,
  getEmissionProviderFilters,
  getCardData
} from './country-header-selectors';

import Component from './country-header-component';

const FEATURE_COUNTRY_CHANGES = process.env.FEATURE_COUNTRY_CHANGES === 'true';

const mapStateToProps = (state, { match }) => {
  const iso = match.params.iso;
  const { data } = state.socioeconomics;
  const stateWithIso = {
    iso,
    countries: state.countries,
    socioeconomics: data ? data[iso] : {},
    ...state
  };

  return {
    country: {
      iso,
      name: getCountryName(stateWithIso)
    },
    description: FEATURE_COUNTRY_CHANGES
      ? getDescriptionText(stateWithIso)
      : getLegacyDescriptionText(stateWithIso),
    emissionProviderFilters: getEmissionProviderFilters(stateWithIso),
    cardData: getCardData(stateWithIso)
  };
};

export default withRouter(connect(mapStateToProps, actions)(Component));
