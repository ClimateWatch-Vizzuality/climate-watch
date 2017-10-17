import { PureComponent, createElement } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { withRouter } from 'react-router';

import NdcSdgComponent from './ndc-sdg-component';
import actions from './ndc-sdg-actions';

class NdcSdgContainer extends PureComponent {
  componentWillMount() {
    this.props.fetchSdgGoals();
  }

  render() {
    return createElement(NdcSdgComponent, {
      ...this.props
    });
  }
}

NdcSdgContainer.propTypes = {
  fetchSdgGoals: PropTypes.func.isRequired
};

export { default as component } from './ndc-sdg-component';
export { initialState } from './ndc-sdg-reducers';
export { default as reducers } from './ndc-sdg-reducers';
export { default as styles } from './ndc-sdg-styles';
export { default as actions } from './ndc-sdg-actions';

export default connect(null, actions)(NdcSdgContainer);
