import { PureComponent, createElement } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import actions from './ndcs-lts-actions';
import reducers, { initialState } from './ndcs-lts-reducers';

import Component from './ndcs-lts-component';
import { getAnchorLinks } from './ndcs-lts-selectors';

const mapStateToProps = (state, { route, location }) => ({
  anchorLinks: getAnchorLinks(route),
  query: location.search
});

class NDCSLTSContainer extends PureComponent {
  componentWillMount() {
    this.props.fetchNDCSLTS();
  }

  render() {
    return createElement(Component, this.props);
  }
}

NDCSLTSContainer.propTypes = {
  fetchNDCSLTS: PropTypes.func.isRequired
};

export { actions, reducers, initialState };
export default withRouter(connect(mapStateToProps, actions)(NDCSLTSContainer));
