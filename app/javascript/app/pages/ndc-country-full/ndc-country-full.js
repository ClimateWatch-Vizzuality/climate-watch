import { createElement } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import qs from 'query-string';

import NDCCountryFullComponent from './ndc-country-full-component';
import actions from './ndc-country-full-actions';
import { getCountry } from './ndc-country-full-selectors';

export { default as component } from './ndc-country-full-component';
export { initialState } from './ndc-country-full-reducers';
export { default as reducers } from './ndc-country-full-reducers';
export { default as actions } from './ndc-country-full-actions';

const mapStateToProps = (state, { match }) => {
  const { iso } = match.params;
  const countryData = {
    countries: state.countries.data,
    iso
  };
  return {
    fetched: state.countryNDCFull.data[iso],
    loading: state.countryNDCFull.loading,
    country: getCountry(countryData),
    content: state.countryNDCFull.data[iso]
  };
};

const NDCCountryFullContainer = props => {
  const {
    loading,
    fetched,
    location,
    match,
    history,
    fetchCountryNDCFull
  } = props;
  const search = qs.parse(location.search);
  const { iso } = match.params;
  if (iso && !loading && !fetched) {
    fetchCountryNDCFull(iso, search.search);
  }

  const onSearchChange = query => {
    const newSearch = { ...search, search: query };
    history.replace({
      pathname: location.pathname,
      search: qs.stringify(newSearch)
    });
    fetchCountryNDCFull(iso, query);
  };

  return createElement(NDCCountryFullComponent, {
    ...props,
    onSearchChange
  });
};

export default withRouter(
  connect(mapStateToProps, actions)(NDCCountryFullContainer)
);
