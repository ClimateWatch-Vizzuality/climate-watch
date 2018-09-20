import { createElement } from 'react';
import { withRouter } from 'react-router';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { handleAnalytics } from 'utils/analytics';

import HomeComponent from './home-component';
import { getCountriesOptions, getCountryLocationData } from './home-selectors';

export { default as component } from './home-component';
export { default as styles } from './home-styles';

const mapStateToProps = state => ({
  countriesOptions: getCountriesOptions(state.countries),
  geolocation: getCountryLocationData(state.geoLocation)
});

const HomeContainer = props => {
  const handleDropDownChange = selected => {
    props.history.push(`/countries/${selected.value}`);
    handleAnalytics('Home', 'Search for a country', selected.value);
  };

  return createElement(HomeComponent, {
    ...props,
    handleDropDownChange
  });
};

HomeContainer.propTypes = {
  location: Proptypes.object
};

export default withRouter(connect(mapStateToProps, null)(HomeContainer));
