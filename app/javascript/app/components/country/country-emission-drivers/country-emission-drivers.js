import { createElement } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from 'components/modal-metadata';
import { handleInfoMetadataClick } from '../country-utils';
import Component from './country-emission-drivers-component';

import {
  getSectionData,
  getQueryIsos,
  getCountryName,
  getMaximumCountries,
  getCountryIndicators
} from './country-emission-drivers-selectors';

const mapStateToProps = (state, { match, location }) => {
  const iso = match.params.iso;
  const search = location.search;
  const countriesData = state.countries.data;
  const climateVulnerability = {
    ...state,
    iso,
    search,
    countriesData
  };

  return {
    sectionData: getSectionData(climateVulnerability),
    indicators: getCountryIndicators(climateVulnerability),
    countries: getQueryIsos(search),
    maximumCountries: getMaximumCountries(climateVulnerability),
    countryName: getCountryName(climateVulnerability),
    iso
  };
};

const EmissionDrivers = props => {
  const { setModalMetadata, indicators } = props;

  const handleInfoClick = slug =>
    handleInfoMetadataClick(
      slug,
      'Emission drivers',
      indicators,
      setModalMetadata
    );

  return createElement(Component, {
    ...props,
    handleInfoClick
  });
};

export default withRouter(connect(mapStateToProps, actions)(EmissionDrivers));
