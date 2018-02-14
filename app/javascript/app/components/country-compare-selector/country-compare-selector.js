import { createElement, PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Proptypes from 'prop-types';
import qs from 'query-string';
import { getLocationParamUpdated } from 'utils/navigation';

import CountryCompareSelectorComponent from './country-compare-selector-component';
import {
  getCountriesOptions,
  getSelectedCountries,
  getCountryConfig
} from './country-compare-selector-selectors';

const mapStateToProps = (state, { location }) => {
  const search = qs.parse(location.search);
  const locations = search.locations ? search.locations.split(',') : [];
  const selectorsState = {
    countriesData: state.countries.data,
    locations
  };
  return {
    locations,
    countryOptions: getCountriesOptions(selectorsState),
    activeCountryOptions: getSelectedCountries(selectorsState),
    selectors: getCountryConfig(selectorsState)
  };
};

class CountryCompareSelectorContainer extends PureComponent {
  updateUrlParam = (params, clear) => {
    const { history, location } = this.props;
    history.replace(getLocationParamUpdated(location, params, clear));
  };

  handleDropDownChange = (index, selected) => {
    const { locations } = this.props;
    const newLocations = locations.slice();
    newLocations[index] = selected ? selected.value : index + 1;
    this.updateUrlParam(
      { name: 'locations', value: newLocations.toString() },
      history,
      location
    );
  };

  render() {
    return createElement(CountryCompareSelectorComponent, {
      handleDropDownChange: this.handleDropDownChange,
      ...this.props
    });
  }
}

CountryCompareSelectorContainer.propTypes = {
  locations: Proptypes.array,
  history: Proptypes.object.isRequired,
  location: Proptypes.object.isRequired
};

export default withRouter(
  connect(mapStateToProps, null)(CountryCompareSelectorContainer)
);
