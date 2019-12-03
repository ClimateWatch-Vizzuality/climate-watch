import { createElement, PureComponent } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import qs from 'query-string';
import { getLocationParamUpdated } from 'utils/navigation';

import LTSCountryComponent from './lts-country-component';
import { getCountry, getAnchorLinks } from './lts-country-selectors';

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
  const pathname = location.pathname.split('/');
  const notSummary = [
    'overview',
    'mitigation',
    'adaptation',
    'sectoral-information'
  ].includes(pathname[pathname.length - 1]);
  return {
    country: getCountry(countryData),
    search: search.search,
    anchorLinks: getAnchorLinks(routeData),
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

  render() {
    return createElement(LTSCountryComponent, {
      ...this.props,
      onSearchChange: this.onSearchChange,
      handleDropDownChange: this.handleDropDownChange
    });
  }
}

LTSCountryContainer.propTypes = {
  history: Proptypes.object.isRequired,
  location: Proptypes.object.isRequired
};

export default withRouter(connect(mapStateToProps, null)(LTSCountryContainer));
