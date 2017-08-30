import { PureComponent, createElement } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import actions from './ndcs-actions';

import Component from './ndcs-component';

function getRouterLinks(routes) {
  return routes.filter(route => route.link).map(route => ({
    label: route.label,
    path: route.path
  }));
}

class NDCContainer extends PureComponent {
  componentWillMount() {
    this.props.fetchNDCS();
  }

  render() {
    return createElement(Component, {
      ...this.props,
      links: getRouterLinks(this.props.route.routes)
    });
  }
}

NDCContainer.propTypes = {
  route: PropTypes.object.isRequired
};

export { initialState } from './ndcs-reducers';
export { default as reducers } from './ndcs-reducers';
export { default as actions } from './ndcs-actions';

NDCContainer.propTypes = {
  fetchNDCS: PropTypes.func.isRequired
};

export default withRouter(connect(null, actions)(NDCContainer));
