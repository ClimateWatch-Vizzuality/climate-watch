import { createElement } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import qs from 'query-string';
import isEmpty from 'lodash/isEmpty';

import NDCCompareComponent from './ndc-compare-component';
import actions from './ndc-compare-actions';
import {
  getNDCs,
  getCountriesOptions,
  getActiveCountries
} from './ndc-compare-selectors';

export { default as component } from './ndc-compare-component';
export { initialState } from './ndc-compare-reducers';
export { default as reducers } from './ndc-compare-reducers';
export { default as actions } from './ndc-compare-actions';

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
  return {
    fetched: !isEmpty(state.NDCCompare.data),
    loading: state.NDCCompare.loading,
    ndcsData: getNDCs(ndcsData),
    locations,
    countries: getCountriesOptions(state.countries),
    activeCountriesOptions: getActiveCountries(activeCountriesData)
  };
};

const NDCCompareContainer = props => {
  const { locations, fetchCompareNDC, loading, fetched } = props;
  if (locations && !loading && !fetched) {
    fetchCompareNDC(locations);
  }

  return createElement(NDCCompareComponent, {
    ...props
  });
};

export default withRouter(
  connect(mapStateToProps, actions)(NDCCompareContainer)
);
