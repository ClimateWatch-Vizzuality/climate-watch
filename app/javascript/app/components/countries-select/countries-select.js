import { PureComponent, createElement } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { isCountryIncluded } from 'app/utils';

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

const mapStateToProps = state => {
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
    countriesList: getFilteredCountriesWithPath(stateWithFilters)
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
  };

  onCountryMouseEnter = country => {
    this.props.countryPreSelect(country);
  };

  onCountryMouseLeave = () => {
    this.props.countryPreSelect('');
  };

  render() {
    return createElement(CountrySelectComponent, {
      ...this.props,
      onCountryClick: this.onCountryClick,
      onCountryMouseEnter: this.onCountryMouseEnter,
      onCountryMouseLeave: this.onCountryMouseLeave
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
