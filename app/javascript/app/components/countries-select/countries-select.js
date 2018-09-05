import { PureComponent, createElement } from 'react';
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

  render() {
    return createElement(CountrySelectComponent, {
      ...this.props,
      handleClickAnalytics: this.handleClickAnalytics,
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
