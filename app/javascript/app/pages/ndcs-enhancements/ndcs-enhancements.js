import { PureComponent, createElement } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import actions from './ndcs-enhancements-actions';
import reducers, { initialState } from './ndcs-enhancements-reducers';

import Component from './ndcs-enhancements-component';
import { getAnchorLinks } from './ndcs-enhancements-selectors';

const mapStateToProps = (state, { route, location }) => ({
  anchorLinks: getAnchorLinks(route),
  query: location.search
});

class NDCSEnhancementsContainer extends PureComponent {
  componentWillMount() {
    this.props.fetchNDCSEnhancements();
  }

  render() {
    return createElement(Component, this.props);
  }
}

NDCSEnhancementsContainer.propTypes = {
  fetchNDCSEnhancements: PropTypes.func.isRequired
};

export { actions, reducers, initialState };
export default withRouter(
  connect(mapStateToProps, actions)(NDCSEnhancementsContainer)
);
