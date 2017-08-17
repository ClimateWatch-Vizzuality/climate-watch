import { createElement } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { deburrUpper } from 'app/utils';
import { getDefaultStyles } from 'app/utils/map';

import paths from 'app/data/world-50m-paths';

import CountrySelectComponent from './countries-select-component';
import actions from './countries-select-actions';
import { getFilteredCountriesWithPath } from './countries-select-selectors';

export { default as component } from './countries-select-component';
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
    const { history, onLeave } = props;
    const country = geometry.id;
    if (country) {
      history.push(`countries/${country}`);
      onLeave();
    }
  };

  const getActiveStyles = () => ({
    default: {
      fill: '#302463',
      stroke: '#607D8B',
      strokeWidth: 0.2,
      outline: 'none'
    },
    hover: {},
    pressed: {}
  });

  const computedStyles = (geography) => {
    const { query } = props;
    const nameUpper = deburrUpper(geography.properties.name);
    const isInFilter = query ? nameUpper.includes(query) : false;
    return isInFilter ? getActiveStyles() : getDefaultStyles();
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
  history: Proptypes.object,
  onLeave: Proptypes.func.isRequired
};

export default withRouter(
  connect(mapStateToProps, actions)(CountrySelectContainer)
);
