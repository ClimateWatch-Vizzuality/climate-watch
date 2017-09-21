import { PureComponent, createElement } from 'react';
import { connect } from 'react-redux';
// import Proptypes from 'prop-types';
// import { withRouter } from 'react-router';

import GhgEmissionsComponent from './ghg-emissions-component';
import actions from './ghg-emissions-actions';
// import { ghgEmissionsSelector } from './countries-select-selectors';

const mapStateToProps = state => ({
  state
});

class GhgEmissionsContainer extends PureComponent {
  render() {
    return createElement(GhgEmissionsComponent, {
      ...this.props
    });
  }
}

GhgEmissionsContainer.propTypes = {};

export { default as component } from './ghg-emissions-component';
export { initialState } from './ghg-emissions-reducers';
export { default as reducers } from './ghg-emissions-reducers';
export { default as styles } from './ghg-emissions-styles';
export { default as actions } from './ghg-emissions-actions';

export default connect(mapStateToProps, actions)(GhgEmissionsContainer);
