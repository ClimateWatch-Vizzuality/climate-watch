import { createElement, PureComponent } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import qs from 'query-string';
import { getLocationParamUpdated } from 'utils/navigation';

import actions from './ndc-country-actions';
import reducers, { initialState } from './ndc-country-reducers';

import NDCCountryComponent from './ndc-country-component';
import { getCountry, getAnchorLinks } from './ndc-country-selectors';

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
  return {
    country: getCountry(countryData),
    search: search.search,
    anchorLinks: getAnchorLinks(routeData)
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

  render() {
    return createElement(NDCCountryComponent, {
      ...this.props,
      onSearchChange: this.onSearchChange
    });
  }
}

NDCCountryContainer.propTypes = {
  history: Proptypes.object.isRequired,
  location: Proptypes.object.isRequired
};

export { actions, reducers, initialState };

export default withRouter(
  connect(mapStateToProps, actions)(NDCCountryContainer)
);
