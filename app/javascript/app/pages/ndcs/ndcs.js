import { PureComponent, createElement } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import actions from './ndcs-actions';
import { getAnchorLinks } from './ndcs-selectors';

import Component from './ndcs-component';

const mapStateToProps = (state, { route }) => ({
  anchorLinks: getAnchorLinks(route)
});

class NDCContainer extends PureComponent {
  componentWillMount() {
    this.props.fetchNDCS();
  }

  render() {
    return createElement(Component, this.props);
  }
}

NDCContainer.propTypes = {};

export { initialState } from './ndcs-reducers';
export { default as reducers } from './ndcs-reducers';
export { default as actions } from './ndcs-actions';

NDCContainer.propTypes = {
  fetchNDCS: PropTypes.func.isRequired
};

export default withRouter(connect(mapStateToProps, actions)(NDCContainer));
