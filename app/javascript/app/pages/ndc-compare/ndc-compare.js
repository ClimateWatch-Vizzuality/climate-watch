import { createElement, PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Proptypes from 'prop-types';
import qs from 'query-string';
import { getLocationParamUpdated } from 'utils/navigation';

import NDCCompareComponent from './ndc-compare-component';
import {
  getCountriesOptionsFiltered,
  getActiveCountries,
  getAnchorLinks
} from './ndc-compare-selectors';

const mapStateToProps = (state, { location, route }) => {
  const search = qs.parse(location.search);
  const locations = search.locations ? search.locations.split(',') : [];
  const activeCountriesData = {
    data: state.countries.data,
    locations
  };
  const countriesOptionsData = {
    data: state.countries.data,
    locations
  };
  const routeData = {
    location,
    route
  };
  return {
    locations,
    countriesOptions: getCountriesOptionsFiltered(countriesOptionsData),
    activeCountriesOptions: getActiveCountries(activeCountriesData),
    anchorLinks: getAnchorLinks(routeData)
  };
};

class NDCCompareContainer extends PureComponent {
  handleDropDownChange = (selector, selected) => {
    const { locations } = this.props;
    const newLocations = locations.slice();
    newLocations[selector] = selected ? selected.value : selector + 1;
    this.updateUrlParam({ name: 'locations', value: newLocations.toString() });
  };

  updateUrlParam = (params, clear) => {
    const { history, location } = this.props;
    history.replace(getLocationParamUpdated(location, params, clear));
  };

  render() {
    return createElement(NDCCompareComponent, {
      handleDropDownChange: this.handleDropDownChange,
      ...this.props
    });
  }
}

NDCCompareContainer.propTypes = {
  history: Proptypes.object.isRequired,
  location: Proptypes.object.isRequired,
  locations: Proptypes.array
};

export default withRouter(connect(mapStateToProps, null)(NDCCompareContainer));
