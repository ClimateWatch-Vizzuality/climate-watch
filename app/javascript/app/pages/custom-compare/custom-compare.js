import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Component from './custom-compare-component';
import { getAnchorLinks } from './custom-compare-selectors';

const mapStateToProps = (state, { location, route }) => {
  const routeData = {
    location,
    route
  };

  return {
    anchorLinks: getAnchorLinks(routeData)
  };
};

const CustomCompare = props => <Component {...props} />;

export default withRouter(connect(mapStateToProps, null)(CustomCompare));
