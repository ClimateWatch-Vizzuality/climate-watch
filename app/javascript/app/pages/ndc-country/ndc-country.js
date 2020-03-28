import { createElement, PureComponent } from 'react';
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
  const countryData = {
    countries: state.countries.data,
    iso: match.params.iso,
    location
  };
  const routeData = {
    iso,
    location,
    route
  };
  const documentsData = {
    iso,
    data: state.ndcsDocumentsMeta.data,
    location
  };
  const pathname = location.pathname.split('/');
  const notSummary = [
    'overview',
    'mitigation',
    'adaptation',
    'sectoral-information'
  ].includes(pathname[pathname.length - 1]);

  return {
    countriesOptions: addUrlToCountries(countryData),
    country: getCountry(countryData),
    search: search.search,
    anchorLinks: getAnchorLinks(routeData),
    documentsOptions: getDocumentsOptions(documentsData),
    documentSelected: getDocumentSelected(documentsData),
    notSummary
  };
};

class NDCCountryContainer extends PureComponent {
  onSearchChange = query => {
    this.updateUrlParam({ name: 'search', value: query });
  };

  handleDropDownChange = documentSelected => {
    this.updateUrlParam({ name: 'document', value: documentSelected.value });
  };

  updateUrlParam = (params, clear) => {
    const { history, location } = this.props;
    history.replace(getLocationParamUpdated(location, params, clear));
  };

  handleCountryLink = selected => {
    const { history, country } = this.props;
    const path = history.location.pathname.replace(
      country.iso_code3,
      selected.value
    );
    history.replace(path);
  };

  render() {
    return createElement(NDCCountryComponent, {
      ...this.props,
      onSearchChange: this.onSearchChange,
      handleCountryLink: this.handleCountryLink,
      handleDropDownChange: this.handleDropDownChange
    });
  }
}

NDCCountryContainer.propTypes = {
  history: Proptypes.object.isRequired,
  location: Proptypes.object.isRequired,
  country: Proptypes.object
};

export default withRouter(connect(mapStateToProps, null)(NDCCountryContainer));
