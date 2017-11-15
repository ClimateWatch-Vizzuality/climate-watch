import { Component, createElement } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import initialState from './widget-picker-initial-state';
import * as actions from './widget-picker-actions';
import reducers from './widget-picker-reducers';
import PickerComponent from './widget-picker-component';

class Picker extends Component {
  static propTypes = {
    fetchMyViz: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    props.fetchMyViz();
  }
  render() {
    return createElement(PickerComponent, this.props);
  }
}

const mapStateToProps = ({ picker }) => picker;

export { actions, reducers, initialState };

export default connect(mapStateToProps, actions)(Picker);
