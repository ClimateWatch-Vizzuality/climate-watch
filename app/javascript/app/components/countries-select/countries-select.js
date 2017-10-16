import { PureComponent, createElement } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import CountrySelectComponent from './countries-select-component';
import actions from './countries-select-actions';
import {
  getFilterUpper,
  getPreSelect,
  getFilteredCountriesWithPath,
  getPathsWithStyles
} from './countries-select-selectors';

export { default as component } from './countries-select-component';
export { initialState } from './countries-select-reducers';
export { default as reducers } from './countries-select-reducers';
export { default as styles } from './countries-select-styles';
export { default as actions } from './countries-select-actions';

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
    countriesList: getFilteredCountriesWithPath(stateWithFilters)
  };
};

class CountrySelectContainer extends PureComponent {
  onCountryClick = geometry => {
    const { history } = this.props;
    const country = geometry.id;
    if (country) {
      history.push(`/countries/${country}`);
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
  countryPreSelect: Proptypes.func.isRequired,
  history: Proptypes.object
};

export default withRouter(
  connect(mapStateToProps, actions)(CountrySelectContainer)
);
