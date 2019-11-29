import { PureComponent, createElement } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import actions from './lts-explore-actions';
import reducers, { initialState } from './lts-explore-reducers';

import Component from './lts-explore-component';

class LTSExploreContainer extends PureComponent {
  componentWillMount() {
    this.props.fetchLTS();
  }

  render() {
    return createElement(Component, this.props);
  }
}

LTSExploreContainer.propTypes = {
  fetchLTS: PropTypes.func.isRequired
};

export { actions, reducers, initialState };
export default withRouter(connect(null, actions)(LTSExploreContainer));
