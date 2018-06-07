import { PureComponent, createElement } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import initialState from './my-cw-vis-graph-initial-state';
import * as reducers from './my-cw-vis-graph-reducers';
import * as actions from './my-cw-vis-graph-actions';

import MyVisGraphComponent from './my-cw-vis-graph-component';

const mapStateToProps = (state, { location }) => {
  const { data } = state.vizGraph;
  const isEmbed = location.pathname.includes('/embed');
  return {
    location,
    isEmbed,
    data
  };
};

class MyVisGraphContainer extends PureComponent {
  componentDidMount() {
    const { location, fetchVisualisation } = this.props;
    if (location) {
      fetchVisualisation(1);
    }
  }

  render() {
    return createElement(MyVisGraphComponent, {
      ...this.props
    });
  }
}

MyVisGraphContainer.propTypes = {
  location: PropTypes.object.isRequired,
  fetchVisualisation: PropTypes.func.isRequired
};

export { actions, reducers, initialState };
export default withRouter(
  connect(mapStateToProps, actions)(MyVisGraphContainer)
);
