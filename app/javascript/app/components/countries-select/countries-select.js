import { createElement } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { deburrUpper } from 'app/utils';

import paths from 'app/data/world-50m-paths';

import CountrySelectComponent from './countries-select-component';
import actions from './countries-select-actions';
import {
  getFilterUpper,
  getPreSelect,
  getFilteredCountriesWithPath
} from './countries-select-selectors';

export { default as component } from './countries-select-component';
export { initialState } from './countries-select-reducers';
export { default as reducers } from './countries-select-reducers';
export { default as styles } from './countries-select-styles';
export { default as actions } from './countries-select-actions';

const mapStateToProps = (state) => {
  const { countrySelect } = state;
  return {
    query: getFilterUpper(countrySelect),
    preSelect: getPreSelect(countrySelect),
    countriesList: getFilteredCountriesWithPath(countrySelect)
  };
};

const CountrySelectContainer = (props) => {
  const onCountryClick = (geometry) => {
    const { history } = props;
    const country = geometry.id;
    if (country) {
      history.push(`/countries/${country}`);
    }
  };

  const onCountryMouseEnter = (country) => {
    props.countryPreSelect(country);
  };

  const onCountryMouseLeave = () => {
    props.countryPreSelect('');
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
      ...countryStyles.defaut,
      fill: '#ffc735',
      fillOpacity: 1
    }
  };

  const semiActiveCountryStyles = {
    ...activeCountryStyles,
    default: {
      ...activeCountryStyles.default,
      fill: '#ecde85'
    }
  };

  const computedStyles = (geography) => {
    const { query, preSelect } = props;
    const nameUpper = deburrUpper(geography.properties.name);
    const isEqual = geography.id === preSelect || nameUpper === query;
    if (isEqual) return activeCountryStyles;

    const isInFilter = query ? nameUpper.includes(query) : false;
    return isInFilter ? semiActiveCountryStyles : countryStyles;
  };

  return createElement(CountrySelectComponent, {
    ...props,
    onCountryClick,
    computedStyles,
    onCountryMouseEnter,
    onCountryMouseLeave,
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
