import { createElement } from 'react';
import { withRouter } from 'react-router';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';

import HomeComponent from './home-component';
import { getCountriesOptions } from './home-selectors';

export { default as component } from './home-component';
export { default as styles } from './home-styles';

const mapStateToProps = state => ({
  countriesOptions: getCountriesOptions(state.countries)
});

const HomeContainer = props => {
  const handleDropDownChange = selected => {
    props.history.push(`/countries/${selected.value}`);
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
