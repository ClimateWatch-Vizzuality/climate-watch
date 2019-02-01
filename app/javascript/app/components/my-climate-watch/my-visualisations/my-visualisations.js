import { createElement, Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loading from 'components/loading';

import * as creatorActions from 'components/my-climate-watch/viz-creator/viz-creator-actions';
import * as myCWEditorActions from 'pages/my-climate-watch/my-cw-editor/my-cw-editor-actions';

import MyVisualisationsComponent from './my-visualisations-component';
import initialState from './my-visualisations-initial-state';
import reducers from './my-visualisations-reducers';
import * as actions from './my-visualisations-actions';

class MyVisualisations extends Component {
  constructor(props) {
    super(props);
    props.fetchMyVisualisations();
  }

  render() {
    if (this.props.loading) return createElement(Loading, { height: 300 });
    return createElement(MyVisualisationsComponent, this.props);
  }
}

MyVisualisations.propTypes = {
  loading: PropTypes.bool.isRequired,
  fetchMyVisualisations: PropTypes.func
};

const mapStateToProps = ({ visualisations, vizCreator }) => ({
  ...visualisations,
  currentId: vizCreator.id,
  creatorIsOpen: vizCreator.creatorIsOpen
});

export { actions, reducers, initialState };

export default connect(mapStateToProps, {
  ...actions,
  ...creatorActions,
  ...myCWEditorActions
})(MyVisualisations);
