import { createElement, PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Proptypes from 'prop-types';
import qs from 'query-string';
import { getLocationParamUpdated } from 'utils/navigation';

import Component from './country-selector-footer-component';

import {
  getSelectedCountries,
  getCountriesOptions
} from './country-selector-footer-selectors';

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
    activeCountryOptions: getSelectedCountries(selectorsState)
  };
};

class CountrySelectorFooterContainer extends PureComponent {
  updateUrlParam = (params, clear) => {
    const { history, location } = this.props;
    history.replace(getLocationParamUpdated(location, params, clear));
  };

  handleSelectionChange = selected => {
    const lastSelectedElement = selected[selected.length - 1];
    const { locations } = this.props;
    const newLocations = locations.slice();
    newLocations.push(lastSelectedElement.value);
    this.updateUrlParam({ name: 'locations', value: newLocations.toString() });
  };

  handleRemove = target => {
    const unselected = target.value;
    const { locations } = this.props;
    const newLocations = locations.filter(country => country !== unselected);
    this.updateUrlParam({ name: 'locations', value: newLocations.toString() });
  };

  render() {
    return createElement(Component, {
      handleRemove: this.handleRemove,
      handleSelectionChange: this.handleSelectionChange,
      ...this.props
    });
  }
}

CountrySelectorFooterContainer.propTypes = {
  history: Proptypes.object.isRequired,
  location: Proptypes.object.isRequired,
  locations: Proptypes.array
};

export default withRouter(
  connect(mapStateToProps, null)(CountrySelectorFooterContainer)
);
