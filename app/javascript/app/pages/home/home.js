import { createElement } from 'react';
import { withRouter } from 'react-router';
import Proptypes from 'prop-types';
import { handleAnalytics } from 'utils/analytics';

import HomeComponent from './home-component';

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

export default withRouter(HomeContainer);
