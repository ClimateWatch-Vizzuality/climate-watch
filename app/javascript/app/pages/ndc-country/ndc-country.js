import { createElement, PureComponent } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import qs from 'query-string';
import { getLocationParamUpdated } from 'utils/navigation';
import {
  getFilterUpper,
  getISOCountries,
  getFilteredCountriesWithPath
} from 'components/countries-select/countries-select-selectors';

import NDCCountryComponent from './ndc-country-component';
import {
  getCountry,
  getAnchorLinks,
  getDocumentsOptions
} from './ndc-country-selectors';

const mapStateToProps = (state, { match, location, route }) => {
  const { iso } = match.params;
  const search = qs.parse(location.search);
  const countryData = {
    countries: state.countries.data,
    iso: match.params.iso
  };
  const routeData = {
    iso,
    location,
    route
  };
  const documentsData = {
    iso,
    data: state.ndcsDocumentsMeta.data
  };
  const pathname = location.pathname.split('/');
  const notSummary = [
    'overview',
    'mitigation',
    'adaptation',
    'sectoral-information'
  ].includes(pathname[pathname.length - 1]);

  const { countrySelect, countries } = state;
  const stateWithFilters = {
    ...countrySelect,
    query: countrySelect.query,
    countries: countries.data
  };

  return {
    query: getFilterUpper(stateWithFilters),
    isoCountries: getISOCountries(stateWithFilters),
    countriesList: getFilteredCountriesWithPath(stateWithFilters),
    country: getCountry(countryData),
    search: search.search,
    anchorLinks: getAnchorLinks(routeData),
    documentsOptions: getDocumentsOptions(documentsData),
    notSummary
  };
};

class NDCCountryContainer extends PureComponent {
  onSearchChange = query => {
    this.updateUrlParam({ name: 'search', value: query });
  };

  updateUrlParam = (params, clear) => {
    const { history, location } = this.props;
    history.replace(getLocationParamUpdated(location, params, clear));
  };

  handleDropDownChange = selected => {
    this.props.history.push(selected.path);
  };

  render() {
    return createElement(NDCCountryComponent, {
      ...this.props,
      onSearchChange: this.onSearchChange,
      handleDropDownChange: this.handleDropDownChange
    });
  }
}

NDCCountryContainer.propTypes = {
  history: Proptypes.object.isRequired,
  location: Proptypes.object.isRequired
};

export default withRouter(connect(mapStateToProps, null)(NDCCountryContainer));
