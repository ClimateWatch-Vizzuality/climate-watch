import { createElement } from 'react';
import { withRouter } from 'react-router';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';

import HomeComponent from './home-component';
import actions from './home-actions';

export { default as component } from './home-component';
export { default as reducers } from './home-reducers';
export { default as styles } from './home-styles';
export { default as actions } from './home-actions';

const mapStateToProps = state => ({
  countriesOptions: state.countrySelect.countries,
  countrySelected: state.home.countrySelected
});

const HomeContainer = (props) => {
  const handleDropDownChange = (selected) => {
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

export default withRouter(connect(mapStateToProps, actions)(HomeContainer));
