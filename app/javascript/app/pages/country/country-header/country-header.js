import { createElement } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { actions } from 'components/anchor-nav';
import { actions as modalActions } from 'components/modal-metadata';

import { handleInfoMetadataClick } from 'components/country/country-utils';

import {
  getCountryName,
  getDescriptionText,
  getLegacyDescriptionText,
  getEmissionProviderFilters,
  getCardData,
  getLoading,
  getCountryIndicators
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
    loading: getLoading(stateWithIso),
    description: FEATURE_COUNTRY_CHANGES
      ? getDescriptionText(stateWithIso)
      : getLegacyDescriptionText(stateWithIso),
    emissionProviderFilters: getEmissionProviderFilters(stateWithIso),
    cardData: getCardData(stateWithIso),
    indicators: getCountryIndicators(stateWithIso)
  };
};

const CountryHeader = props => {
  const { setModalMetadata, indicators } = props;
  const handleInfoClick = slug =>
    handleInfoMetadataClick(
      slug,
      'Country Header',
      indicators,
      setModalMetadata
    );
  return createElement(Component, { ...props, handleInfoClick });
};

export default withRouter(
  connect(mapStateToProps, { ...actions, ...modalActions })(CountryHeader)
);
