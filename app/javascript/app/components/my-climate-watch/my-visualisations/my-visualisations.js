import { createElement, Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { actions as creatorActions } from 'components/my-climate-watch/viz-creator';

import MyVisualisationsComponent from './my-visualisations-component';
import initialState from './my-visualisations-initial-state';
import reducers from './my-visualisations-reducers';
import * as ownActions from './my-visualisations-actions';

const actions = { ...creatorActions, ...ownActions };

const mapStateToProps = ({ visualisations, vizCreator }) => ({
  ...visualisations,
  creatorIsOpen: vizCreator.creatorIsOpen
});

class MyVisualisations extends Component {
  constructor(props) {
    super(props);
    props.fetchVisualisations();
  }

  render() {
    return createElement(MyVisualisationsComponent, this.props);
  }
}

MyVisualisations.propTypes = {
  fetchVisualisations: PropTypes.func
};

export { actions, reducers, initialState };

export default connect(mapStateToProps, actions)(MyVisualisations);
