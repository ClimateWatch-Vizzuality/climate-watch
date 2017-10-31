import { createElement } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import qs from 'query-string';

import NDCCompareComponent from './ndc-compare-component';
import {
  getCountriesOptionsFiltered,
  getActiveCountries,
  getAnchorLinks
} from './ndc-compare-selectors';

const mapStateToProps = (state, { location, route }) => {
  const search = qs.parse(location.search);
  const locations = search.locations ? search.locations.split(',') : [];
  const activeCountriesData = {
    data: state.countries.data,
    locations
  };
  const countriesOptionsData = {
    data: state.countries.data,
    locations
  };
  const routeData = {
    location,
    route
  };
  return {
    locations,
    countriesOptions: getCountriesOptionsFiltered(countriesOptionsData),
    activeCountriesOptions: getActiveCountries(activeCountriesData),
    anchorLinks: getAnchorLinks(routeData)
  };
};

const NDCCompareContainer = props => {
  const {
    history,
    location,
    locations
  } = props;

  const handleDropDownChange = (selector, selected) => {
    const search = qs.parse(location.search);
    const newLocations = locations.slice();
    newLocations[selector] = selected ? selected.value : selector + 1;
    const newSearch = {
      ...search,
      locations: newLocations.toString()
    };
    history.replace({
      pathname: location.pathname,
      search: qs.stringify(newSearch)
    });
    // fetchCompareNDC(newLocations);
  };

  return createElement(NDCCompareComponent, {
    handleDropDownChange,
    ...props
  });
};

export default withRouter(
  connect(mapStateToProps, null)(NDCCompareContainer)
);
