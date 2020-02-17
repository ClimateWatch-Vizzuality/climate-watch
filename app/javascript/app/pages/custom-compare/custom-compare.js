import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import qs from 'query-string';
import { getLocationParamUpdated } from 'utils/navigation';
import PropTypes from 'prop-types';

import Component from './custom-compare-component';
import { getAnchorLinks, getFiltersData } from './custom-compare-selectors';

const mapStateToProps = (state, { location, route }) => {
  const search = qs.parse(location.search);
  const routeData = {
    location,
    route
  };

  return {
    anchorLinks: getAnchorLinks(routeData),
    filtersData: getFiltersData(state, { search })
  };
};

const CustomCompare = props => {
  const { history } = props;

  const handleFilterChange = (name, value) => {
    const params = { name, value };
    history.replace(getLocationParamUpdated(location, params));
  };

  return <Component {...props} handleFilterChange={handleFilterChange} />;
};

CustomCompare.propTypes = {
  history: PropTypes.object.isRequired
};

export default withRouter(connect(mapStateToProps, null)(CustomCompare));
