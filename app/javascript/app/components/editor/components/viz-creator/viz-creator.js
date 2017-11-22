import { Component, createElement } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import initialState from './viz-creator-initial-state';
import * as actions from './viz-creator-actions';
import reducers from './viz-creator-reducers';

import VizCreatorComponent from './viz-creator-component';
import { vizSelector, filtersSelector } from './viz-creator-selectors';

class VizCreator extends Component {
  static propTypes = {
    fetchDatasets: PropTypes.func.isRequired,
    fetchLocations: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    props.fetchDatasets();
    props.fetchLocations();
  }

  render() {
    return createElement(VizCreatorComponent, this.props);
  }
}

const mapStateToProps = ({ vizCreator }) => ({
  ...vizCreator,
  visualisations: vizSelector(vizCreator),
  selectors: filtersSelector(vizCreator)
});

export { actions, reducers, initialState };

export default connect(mapStateToProps, actions)(VizCreator);
