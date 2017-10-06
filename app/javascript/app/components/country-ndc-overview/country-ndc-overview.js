import { PureComponent, createElement } from 'react';
import { connect } from 'react-redux';
// import Proptypes from 'prop-types';
// import { withRouter } from 'react-router';

import CountryNdcOverviewComponent from './country-ndc-overview-component';
import actions from './country-ndc-overview-actions';
// import { countryNdcOverviewSelector } from './countries-select-selectors';

const mapStateToProps = state => ({
  state
});

class CountryNdcOverviewContainer extends PureComponent {
  render() {
    return createElement(CountryNdcOverviewComponent, {
      ...this.props
    });
  }
}

CountryNdcOverviewContainer.propTypes = {};

export { default as component } from './country-ndc-overview-component';
export { initialState } from './country-ndc-overview-reducers';
export { default as reducers } from './country-ndc-overview-reducers';
export { default as styles } from './country-ndc-overview-styles';
export { default as actions } from './country-ndc-overview-actions';

export default connect(mapStateToProps, actions)(CountryNdcOverviewContainer);
