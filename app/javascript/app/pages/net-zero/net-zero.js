import { PureComponent, createElement } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import actions from './net-zero-actions';
import reducers, { initialState } from './net-zero-reducers';

import Component from './net-zero-component';

class NetZeroContainer extends PureComponent {
  componentWillMount() {
    this.props.fetchLTS();
  }

  render() {
    return createElement(Component, this.props);
  }
}

NetZeroContainer.propTypes = {
  fetchLTS: PropTypes.func.isRequired
};

export { actions, reducers, initialState };
export default withRouter(connect(null, actions)(NetZeroContainer));
