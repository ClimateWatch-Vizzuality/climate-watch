import { createElement, Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import MyVisualisationsComponent from './my-visualisations-component';
import initialState from './my-visualisations-initial-state';
import reducers from './my-visualisations-reducers';
import * as actions from './my-visualisations-actions';

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

const mapStateToProps = ({ visualisations }) => ({ ...visualisations });

export { actions, reducers, initialState };

export default connect(mapStateToProps, actions)(MyVisualisations);
