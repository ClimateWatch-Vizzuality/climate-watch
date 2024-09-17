import { PureComponent, createElement } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import actions from './ndc-2025-tracker-actions';
import reducers, { initialState } from './ndc-2025-tracker-reducers';

import Component from './ndc-2025-tracker-component';

class NetZeroContainer extends PureComponent {
  componentWillMount() {
    this.props.fetchNetZero();
  }

  render() {
    return createElement(Component, this.props);
  }
}

NetZeroContainer.propTypes = {
  fetchNetZero: PropTypes.func.isRequired
};

export { actions, reducers, initialState };
export default withRouter(connect(null, actions)(NetZeroContainer));
