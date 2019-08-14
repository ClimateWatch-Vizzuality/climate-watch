import React, { PureComponent, createElement } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { isCountryIncluded } from 'app/utils';
import { isPageContained, isPageNdcp } from 'utils/navigation';
import { handleAnalytics } from 'utils/analytics';

import actions from './countries-select-actions';
import reducers, { initialState } from './countries-select-reducers';
import CountrySelectComponent from './countries-select-component';
import {
  getFilterUpper,
  getPreSelect,
  getISOCountries,
  getFilteredCountriesWithPath,
  getPathsWithStyles
} from './countries-select-selectors';

const mapStateToProps = (state, { location }) => {
  const { countrySelect, countries } = state;
  const stateWithFilters = {
    ...countrySelect,
    query: countrySelect.query,
    countries: countries.data
  };
  return {
    paths: getPathsWithStyles(stateWithFilters),
    query: getFilterUpper(stateWithFilters),
    preSelect: getPreSelect(stateWithFilters),
    isoCountries: getISOCountries(stateWithFilters),
    countriesList: getFilteredCountriesWithPath(stateWithFilters),
    isCompareVisible: !isPageNdcp(location) && !isPageContained
  };
};

class CountrySelectContainer extends PureComponent {
  componentWillUnmount() {
    this.props.countryPreSelect('');
    this.props.countrySelectFilter('');
  }

  onCountryClick = geometry => {
    const { isoCountries, history } = this.props;
    const iso = geometry.properties && geometry.properties.id;
    if (iso && isCountryIncluded(isoCountries, iso)) {
      history.push(`/countries/${iso}`);
    }
    handleAnalytics('Home', 'Use map to find country', iso);
  };

  onCountryMouseEnter = country => {
    this.props.countryPreSelect(country);
  };

  onCountryMouseLeave = () => {
    this.props.countryPreSelect('');
  };

  handleClickAnalytics = iso => {
    handleAnalytics('Home', 'Search for a country', iso);
  };

  handleMarkerClick = marker => {
    if (marker && marker.link) window.open(marker.link, '_blank');
  };

  render() {
    const pin = (
      <svg width="8" height="12" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M1.096.3h6.773v6.706L5.274 4.674C3.813 6.136.864 8.29 2.4 11.7c-4.746-3.82-.831-7.351.81-9.092L1.096.3z"
          fill="#FFF"
          fillRule="evenodd"
        />
      </svg>
    );

    const markers = [
      {
        coordinates: [28.034, -26.1952],
        link: 'http://southafricaclimateexplorer.org',
        name: 'South Africa Explorer',
        pin
      },
      {
        coordinates: [79.2167, 20.6448],
        link: 'https://indiaclimateexplorer.org/',
        name: 'India platform',
        pin
      },
      {
        coordinates: [112.0149, -3.54],
        link: 'https://indonesia.climatewatchdata.org',
        name: 'Indonesia Platform',
        pin
      }
    ];

    return createElement(CountrySelectComponent, {
      ...this.props,
      handleClickAnalytics: this.handleClickAnalytics,
      onCountryClick: this.onCountryClick,
      onCountryMouseEnter: this.onCountryMouseEnter,
      onCountryMouseLeave: this.onCountryMouseLeave,
      handleMarkerClick: this.handleMarkerClick,
      markers
    });
  }
}

CountrySelectContainer.propTypes = {
  isoCountries: Proptypes.array.isRequired,
  countrySelectFilter: Proptypes.func.isRequired,
  countryPreSelect: Proptypes.func.isRequired,
  history: Proptypes.object
};

export { actions, reducers, initialState };

export default withRouter(
  connect(mapStateToProps, actions)(CountrySelectContainer)
);
