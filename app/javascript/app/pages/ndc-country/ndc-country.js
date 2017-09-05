import { createElement } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import qs from 'query-string';

import NDCCountryComponent from './ndc-country-component';
import actions from './ndc-country-actions';
import { getCountry, filterDefs } from './ndc-country-selectors';

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
    ndcs: state.countryNDC.data[match.params.iso],
    search: search.search
  };

  return {
    country: getCountry(countryData),
    hasData: !!state.countryNDC.data[match.params.iso],
    search: search.search,
    data:
      state.countryNDC.data[match.params.iso] &&
      (search.search !== '' && search.search)
        ? filterDefs(ndcsData)
        : state.countryNDC.data[match.params.iso]
  };
};

const NDCCountryContainer = props => {
  const { hasData, location, match, history, fetchCountryNDC } = props;
  const { iso } = match.params;
  if (!hasData && iso) {
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
