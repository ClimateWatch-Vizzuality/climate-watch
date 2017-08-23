import { createElement } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { deburrUpper } from 'app/utils';

import paths from 'app/data/world-50m-paths';

import CountrySelectComponent from './countries-select-component';
import actions from './countries-select-actions';
import { getFilteredCountriesWithPath } from './countries-select-selectors';

export { default as component } from './countries-select-component';
export { initialState } from './countries-select-reducers';
export { default as reducers } from './countries-select-reducers';
export { default as styles } from './countries-select-styles';
export { default as actions } from './countries-select-actions';

const mapStateToProps = (state) => {
  const { query } = state.countrySelect;
  return {
    query: deburrUpper(query),
    countriesList: getFilteredCountriesWithPath(state.countrySelect)
  };
};

const CountrySelectContainer = (props) => {
  const onCountryClick = (geometry) => {
    const { history } = props;
    const country = geometry.id;
    if (country) {
      history.push(`countries/${country}`);
    }
  };

  const countryStyles = {
    default: {
      fill: '#ECEFF1',
      fillOpacity: 0.3,
      stroke: '#396d90',
      strokeWidth: 0.7,
      outline: 'none'
    },
    hover: {
      fill: '#ffc735',
      stroke: '#396d90',
      strokeWidth: 0.7,
      outline: 'none'
    },
    pressed: {
      fill: '#ffc735',
      stroke: '#396d90',
      strokeWidth: 1,
      outline: 'none'
    }
  };

  const activeCountryStyles = {
    ...countryStyles,
    default: {
      fill: '#ffc735'
    }
  };

  const computedStyles = (geography) => {
    const { query } = props;
    const nameUpper = deburrUpper(geography.properties.name);
    const isInFilter = query ? nameUpper.includes(query) : false;
    return isInFilter ? activeCountryStyles : countryStyles;
  };

  return createElement(CountrySelectComponent, {
    ...props,
    onCountryClick,
    computedStyles,
    paths
  });
};

CountrySelectContainer.propTypes = {
  query: Proptypes.string,
  history: Proptypes.object
};

export default withRouter(
  connect(mapStateToProps, actions)(CountrySelectContainer)
);
