import { createElement } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import qs from 'query-string';
import isEmpty from 'lodash/isEmpty';

import actions from './ndc-compare-actions';
import reducers, { initialState } from './ndc-compare-reducers';

import NDCCompareComponent from './ndc-compare-component';
import {
  getNDCs,
  getCountriesOptionsFiltered,
  getActiveCountries
} from './ndc-compare-selectors';

const mapStateToProps = (state, { location }) => {
  const search = qs.parse(location.search);
  const locations = search.locations ? search.locations.split(',') : [];
  const ndcsData = {
    data: state.NDCCompare.data,
    locations
  };
  const activeCountriesData = {
    data: state.countries.data,
    locations
  };
  const countriesOptionsData = {
    data: state.countries.data,
    locations
  };
  return {
    fetched: !isEmpty(state.NDCCompare.data),
    loading: state.NDCCompare.loading,
    ndcsData: getNDCs(ndcsData),
    locations,
    countriesOptions: getCountriesOptionsFiltered(countriesOptionsData),
    activeCountriesOptions: getActiveCountries(activeCountriesData)
  };
};

const NDCCompareContainer = props => {
  const {
    history,
    location,
    locations,
    fetchCompareNDC,
    loading,
    fetched
  } = props;
  if (locations && !loading && !fetched) {
    fetchCompareNDC(locations);
  }

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
    fetchCompareNDC(newLocations);
  };

  return createElement(NDCCompareComponent, {
    handleDropDownChange,
    ...props
  });
};

export { actions, reducers, initialState };

export default withRouter(
  connect(mapStateToProps, actions)(NDCCompareContainer)
);
