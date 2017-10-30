import { createElement } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import qs from 'query-string';

import actions from './ndc-country-actions';
import reducers, { initialState } from './ndc-country-reducers';

import NDCCountryComponent from './ndc-country-component';
import { getCountry, filterNDCs, getAnchorLinks } from './ndc-country-selectors';

const mapStateToProps = (state, { match, location, route }) => {
  const { iso } = match.params;
  const search = qs.parse(location.search);
  const countryData = {
    countries: state.countries.data,
    iso: match.params.iso
  };
  const ndcsData = {
    data: state.countryNDC.data[match.params.iso],
    search: search.search,
    countries: [match.params.iso]
  };
  const routeData = {
    iso,
    location,
    route
  };
  return {
    fetched: state.countryNDC.data[iso],
    loading: state.countryNDC.loading,
    country: getCountry(countryData),
    search: search.search,
    ndcsData: filterNDCs(ndcsData),
    anchorLinks: getAnchorLinks(routeData)
  };
};

const NDCCountryContainer = props => {
  const { location, match, history, fetchCountryNDC, loading, fetched } = props;
  const { iso } = match.params;
  if (iso && !loading && !fetched) {
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

export { actions, reducers, initialState };

export default withRouter(
  connect(mapStateToProps, actions)(NDCCountryContainer)
);
