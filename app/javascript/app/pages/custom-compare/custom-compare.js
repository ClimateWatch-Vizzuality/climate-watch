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
  getSelectedTargets,
  getBackButtonLink
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
    selectedTargets: getSelectedTargets(state, { search }),
    backButtonLink: getBackButtonLink(null, { search })
  };
};

const CustomCompare = props => {
  const { history } = props;

  const updateTargetParams = newTargets => {
    const params = {
      name: 'targets',
      value: newTargets.toString()
    };
    history.replace(getLocationParamUpdated(location, params));
  };

  const handleCountryFilterChange = (targetKey, newCountry) => {
    const { selectedTargets } = props;
    const newTargetParams = selectedTargets.map(
      ({ key, country, document }) => {
        if (key === targetKey) return `${newCountry}-`;
        return `${country}-${document}`;
      }
    );

    updateTargetParams(newTargetParams);
  };

  const handleDocumentFilterChange = (targetKey, newDocument) => {
    const { selectedTargets } = props;
    const newTargetParams = selectedTargets.map(
      ({ key, country, document }) => {
        if (key === targetKey) return `${country}-${newDocument}`;
        return `${country}-${document}`;
      }
    );

    updateTargetParams(newTargetParams);
  };

  return (
    <Component
      {...props}
      handleCountryFilterChange={handleCountryFilterChange}
      handleDocumentFilterChange={handleDocumentFilterChange}
    />
  );
};

CustomCompare.propTypes = {
  history: PropTypes.object.isRequired
};

export default withRouter(connect(mapStateToProps, null)(CustomCompare));
