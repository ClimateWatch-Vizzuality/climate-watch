import { PureComponent, createElement } from 'react';
import { connect } from 'react-redux';
// import Proptypes from 'prop-types';
// import { withRouter } from 'react-router';

import NdcSdgComponent from './ndc-sdg-component';
import actions from './ndc-sdg-actions';
// import { ndcSdgSelector } from './countries-select-selectors';

const mapStateToProps = state => ({
  state
});

class NdcSdgContainer extends PureComponent {
  render() {
    return createElement(NdcSdgComponent, {
      ...this.props
    });
  }
}

NdcSdgContainer.propTypes = {};

export { default as component } from './ndc-sdg-component';
export { initialState } from './ndc-sdg-reducers';
export { default as reducers } from './ndc-sdg-reducers';
export { default as styles } from './ndc-sdg-styles';
export { default as actions } from './ndc-sdg-actions';

export default connect(mapStateToProps, actions)(NdcSdgContainer);
