import { createElement, PureComponent } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import qs from 'query-string';
import { getLocationParamUpdated } from 'utils/navigation';

import LTSCountryComponent from './lts-country-component';
import {
  getCountry,
  getAnchorLinks,
  getDocumentsOptions,
  addUrlToCountries
} from './lts-country-selectors';

const mapStateToProps = (state, { match, location, route }) => {
  const { iso } = match.params;
  const search = qs.parse(location.search);
  const stateData = {
    iso,
    location,
    route,
    countries: state.countries.data,
    data: state.ndcsDocumentsMeta.data
  };

  const pathname = location.pathname.split('/');
  const notSummary = [
    'overview',
    'mitigation',
    'adaptation',
    'sectoral-information'
  ].includes(pathname[pathname.length - 1]);
  return {
    country: getCountry(stateData),
    search: search.search,
    anchorLinks: getAnchorLinks(stateData),
    countriesOptions: addUrlToCountries(stateData),
    documentsOptions: getDocumentsOptions(stateData),
    notSummary
  };
};

class LTSCountryContainer extends PureComponent {
  onSearchChange = query => {
    this.updateUrlParam({ name: 'search', value: query });
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
    return createElement(LTSCountryComponent, {
      ...this.props,
      onSearchChange: this.onSearchChange,
      handleDropDownChange: this.handleDropDownChange,
      handleCountryLink: this.handleCountryLink
    });
  }
}

LTSCountryContainer.propTypes = {
  history: Proptypes.object.isRequired,
  location: Proptypes.object.isRequired,
  country: Proptypes.object
};

export default withRouter(connect(mapStateToProps, null)(LTSCountryContainer));
