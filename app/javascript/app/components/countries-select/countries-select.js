import { createElement } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { deburrUpper } from 'app/utils';
import includes from 'lodash/includes';

import paths from 'app/data/world-50m-paths';

import CountrySelectComponent from './countries-select-component';
import actions from './countries-select-actions';

export { default as component } from './countries-select-component';
export { default as reducers } from './countries-select-reducers';
export { default as styles } from './countries-select-styles';
export { default as actions } from './countries-select-actions';

function getCountriesFiltered(countries, queryUpper) {
  // TODO: use reselect here
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
  const queryUpper = deburrUpper(query);
  return {
    query: queryUpper,
    countriesList: getCountriesFiltered(countries, queryUpper)
  };
};

const CountrySelectContainer = (props) => {
  const onCountryClick = (geometry) => {
    const { history, onLeave } = props;
    const country = geometry.id;
    if (country) {
      history.push(`countries/${country}`);
      onLeave();
    }
  };

  const computedStyles = (geography) => {
    const { query } = props;
    const nameUpper = deburrUpper(geography.properties.name);
    const isInFilter = query ? includes(nameUpper, query) : false;
    if (isInFilter) {
      return {
        default: {
          fill: '#302463',
          stroke: '#607D8B',
          strokeWidth: 0.2,
          outline: 'none'
        },
        hover: {},
        pressed: {}
      };
    }
    return {
      default: {
        fill: '#ECEFF1',
        stroke: '#607D8B',
        strokeWidth: 0.2,
        outline: 'none'
      },
      hover: {
        fill: '#302463',
        stroke: '#607D8B',
        strokeWidth: 0.2,
        outline: 'none'
      },
      pressed: {
        fill: '#FF5722',
        stroke: '#607D8B',
        strokeWidth: 0.5,
        outline: 'none'
      }
    };
  };

  return createElement(CountrySelectComponent, {
    ...this.props,
    onCountryClick,
    computedStyles,
    paths
  });
};

CountrySelectContainer.propTypes = {
  query: Proptypes.string,
  history: Proptypes.object,
  onLeave: Proptypes.func.isRequired
};

export default withRouter(
  connect(mapStateToProps, actions)(CountrySelectContainer)
);
