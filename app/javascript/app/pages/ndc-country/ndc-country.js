import { createElement } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import qs from 'query-string';

import NDCCountryComponent from './ndc-country-component';
import { getCountry, getAnchorLinks } from './ndc-country-selectors';

const mapStateToProps = (state, { match, location, route }) => {
  const { iso } = match.params;
  const search = qs.parse(location.search);
  const countryData = {
    countries: state.countries.data,
    iso: match.params.iso
  };
  const routeData = {
    iso,
    location,
    route
  };
  return {
    country: getCountry(countryData),
    search: search.search,
    anchorLinks: getAnchorLinks(routeData),
    documentsOptions: null
  };
};

const NDCCountryContainer = props => {
  const { location, history } = props;

  const handleDropDownChange = option => {
    this.props.history.push(option.path);
  };

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
    onSearchChange,
    handleDropDownChange
  });
};

export default withRouter(connect(mapStateToProps, null)(NDCCountryContainer));
