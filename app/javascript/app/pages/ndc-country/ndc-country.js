import { createElement, useEffect } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import qs from 'query-string';
import { getLocationParamUpdated } from 'utils/navigation';

import NDCCountryComponent from './ndc-country-component';
import {
  getCountry,
  getAnchorLinks,
  getDocumentsOptions,
  getDocumentSelected,
  addUrlToCountries
} from './ndc-country-selectors';

const mapStateToProps = (state, { match, location, route }) => {
  const { iso } = match.params;
  const search = qs.parse(location.search);
  const stateData = {
    iso,
    route,
    location,
    ...state
  };
  const pathname = location.pathname.split('/');
  const notSummary = [
    'overview',
    'mitigation',
    'adaptation',
    'sectoral-information'
  ].includes(pathname[pathname.length - 1]);

  return {
    countriesOptions: addUrlToCountries(stateData),
    country: getCountry(stateData),
    search: search.search,
    anchorLinks: getAnchorLinks(stateData),
    documentsOptions: getDocumentsOptions(stateData),
    documentSelected: getDocumentSelected(stateData),
    notSummary
  };
};

function NDCCountryContainer(props) {
  const { history, location, country, documentsOptions } = props;

  const updateUrlParam = (params, clear) => {
    history.replace(getLocationParamUpdated(location, params, clear));
  };

  useEffect(() => {
    const search = location.search && qs.parse(location.search);
    if (
      (!search || !search.document) &&
      documentsOptions &&
      documentsOptions.length
    ) {
      updateUrlParam({
        name: 'document',
        value: documentsOptions[documentsOptions.length - 1].value
      });
    }
  }, [documentsOptions]);

  const onSearchChange = query => {
    updateUrlParam({ name: 'search', value: query });
  };

  const handleDropDownChange = documentSelected => {
    updateUrlParam({ name: 'document', value: documentSelected.value });
  };

  const handleCountryLink = selected => {
    if (selected) {
      const path = history.location.pathname.replace(
        country.iso_code3,
        selected.value
      );
      history.replace(path);
    }
  };

  return createElement(NDCCountryComponent, {
    ...props,
    onSearchChange,
    handleCountryLink,
    handleDropDownChange
  });
}

NDCCountryContainer.propTypes = {
  history: Proptypes.object.isRequired,
  location: Proptypes.object.isRequired,
  country: Proptypes.object
};

export default withRouter(connect(mapStateToProps, null)(NDCCountryContainer));
