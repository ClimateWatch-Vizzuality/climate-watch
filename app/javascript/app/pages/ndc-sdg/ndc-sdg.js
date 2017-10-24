import { PureComponent, createElement } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
// import { withRouter } from 'react-router';

import actions from './ndc-sdg-actions';
import reducers, { initialState } from './ndc-sdg-reducers';
import NdcSdgComponent from './ndc-sdg-component';

class NdcSdgContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      // using local state to better performant
      goalHover: null,
      targetHover: null
    };
  }
  componentWillMount() {
    this.props.fetchSdgGoals();
  }

  handleGoalHover = debounce(goal => {
    this.setState({ goalHover: goal });
  }, 300);

  handleTargetHover = debounce(target => {
    this.setState({ targetHover: target });
  }, 300);

  render() {
    return createElement(NdcSdgComponent, {
      ...this.props,
      goalHover: this.state.goalHover,
      targetHover: this.state.targetHover,
      handleGoalHover: this.handleGoalHover,
      handleTargetHover: this.handleTargetHover
    });
  }
}

NdcSdgContainer.propTypes = {
  fetchSdgGoals: PropTypes.func.isRequired
};

export { actions, reducers, initialState };

export default connect(null, actions)(NdcSdgContainer);
