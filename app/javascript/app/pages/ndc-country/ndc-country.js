import { createElement } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import qs from 'query-string';
import isEmpty from 'lodash/isEmpty';

import NDCCountryComponent from './ndc-country-component';
import actions from './ndc-country-actions';
import { getCountry, getNDCs } from './ndc-country-selectors';

export { default as component } from './ndc-country-component';
export { initialState } from './ndc-country-reducers';
export { default as reducers } from './ndc-country-reducers';
export { default as actions } from './ndc-country-actions';

const mapStateToProps = (state, { match, location }) => {
  const search = qs.parse(location.search);
  const countryData = {
    countries: state.countries.data,
    iso: match.params.iso
  };
  const ndcsData = {
    data: state.countryNDC.data,
    search: search.search,
    countries: [match.params.iso]
  };
  return {
    country: getCountry(countryData),
    fetchNeeds: isEmpty(state.countryNDC.data) && !state.countryNDC.loading,
    search: search.search,
    ndcsData: isEmpty(state.countryNDC.data) ? [] : getNDCs(ndcsData)
  };
};

const NDCCountryContainer = props => {
  const { fetchNeeds, location, match, history, fetchCountryNDC } = props;
  const { iso } = match.params;
  if (fetchNeeds && iso) {
    fetchCountryNDC(iso);
  }

  const onSearchChange = query => {
    const search = qs.parse(location.search);
    const newSearch = { ...search, search: query };

    history.replace({
      pathname: location.pathname,
      search: qs.stringify(newSearch)
    });
  };

  return createElement(NDCCountryComponent, {
    ...props,
    onSearchChange
  });
};

export default withRouter(
  connect(mapStateToProps, actions)(NDCCountryContainer)
);
