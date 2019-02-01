import { PureComponent, createElement } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import initialState from './my-cw-vis-graph-initial-state';
import reducers from './my-cw-vis-graph-reducers';
import * as actions from './my-cw-vis-graph-actions';

import MyVisGraphComponent from './my-cw-vis-graph-component';

const mapStateToProps = (state, { location, match }) => {
  const id = match.params.id;
  const { data } = state.vizGraph;
  return {
    location,
    id,
    data
  };
};

class MyVisGraphContainer extends PureComponent {
  componentDidMount() {
    const { location, id, fetchVisualisation } = this.props;
    if (location) {
      fetchVisualisation(id);
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
  id: PropTypes.string.isRequired,
  fetchVisualisation: PropTypes.func.isRequired
};

export { actions, reducers, initialState };
export default withRouter(
  connect(mapStateToProps, actions)(MyVisGraphContainer)
);
