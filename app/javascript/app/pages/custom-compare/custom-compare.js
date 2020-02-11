import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import qs from 'query-string';
import { getLocationParamUpdated } from 'utils/navigation';
import PropTypes from 'prop-types';

import Component from './custom-compare-component';
import {
  getAnchorLinks,
  getFiltersData,
  getCountryOptions
} from './custom-compare-selectors';

const mapStateToProps = (state, { location, route }) => {
  const search = qs.parse(location.search);
  const routeData = {
    location,
    route
  };

  return {
    anchorLinks: getAnchorLinks(routeData),
    filtersData: getFiltersData(state, { search }),
    countryOptions: getCountryOptions(state)
    // ,
    // filtersSelected: getFiltersSelected(state, { search })
  };
};

const CustomCompare = props => {
  const { history } = props;

  const updateUrlParam = (param, clear) => {
    history.replace(getLocationParamUpdated(location, param, clear));
  };

  const handleSearchChange = newParams => {
    updateUrlParam(newParams);
  };

  return <Component {...props} handleCountryChange={handleSearchChange} />;
};

CustomCompare.propTypes = {
  history: PropTypes.object.isRequired
};

export default withRouter(connect(mapStateToProps, null)(CustomCompare));
