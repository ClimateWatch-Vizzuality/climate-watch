import { createElement } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from 'components/modal-metadata';
import Component from './country-emission-drivers-component';

import {
  getSectionData,
  getQueryIsos,
  getCountryName,
  getMaximumCountries
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
    countries: getQueryIsos(search),
    maximumCountries: getMaximumCountries(climateVulnerability),
    countryName: getCountryName(climateVulnerability),
    iso
  };
};

const EmissionDrivers = props => {
  const { setModalMetadata } = props;

  const handleInfoClick = slug => {
    setModalMetadata({
      category: 'Emission drivers',
      slugs: slug,
      open: true
    });
  };

  return createElement(Component, {
    ...props,
    handleInfoClick
  });
};

export default withRouter(connect(mapStateToProps, actions)(EmissionDrivers));
