import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { deburrUpper } from 'app/utils';
import includes from 'lodash/includes';

import Component from './countries-select-component';
import actions from './countries-select-actions';

export { default as component } from './countries-select-component';
export { default as reducers } from './countries-select-reducers';
export { default as styles } from './countries-select-styles';
export { default as actions } from './countries-select-actions';

function getCountriesFiltered(countries, query) {
  // TODO: use reselect here
  const queryUpper = deburrUpper(query);
  const filteredCountries = queryUpper
    ? countries.filter(country =>
      includes(deburrUpper(country.label), queryUpper)
    )
    : countries;
  return filteredCountries.map(country => ({
    value: country.value,
    label: country.label,
    path: `countries/${country.value}`
  }));
}

const mapStateToProps = (state) => {
  const { query, countries } = state.countrySelect;
  return {
    query,
    countriesList: getCountriesFiltered(countries, query)
  };
};

export default withRouter(connect(mapStateToProps, actions)(Component));
