import { PureComponent, createElement } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import { withRouter } from 'react-router';
import { handleAnalytics } from 'utils/analytics';

import actions from './ndc-sdg-linkages-content-actions';
import reducers, { initialState } from './ndc-sdg-linkages-content-reducers';
import NdcSdgLinkagesComponent from './ndc-sdg-linkages-content-component';

class NdcSdgLinkagesContentContainer extends PureComponent {
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
    handleAnalytics('NDC-SDG map', 'SDG being visualised', goal.toString());
  }, 50);

  handleTargetHover = debounce(target => {
    this.setState({ targetHover: target });
  }, 20);

  render() {
    return createElement(NdcSdgLinkagesComponent, {
      ...this.props,
      goalHover: this.state.goalHover,
      targetHover: this.state.targetHover,
      handleGoalHover: this.handleGoalHover,
      handleTargetHover: this.handleTargetHover
    });
  }
}

NdcSdgLinkagesContentContainer.propTypes = {
  fetchSdgGoals: PropTypes.func.isRequired
};

export { actions, reducers, initialState };

export default withRouter(
  connect(null, actions)(NdcSdgLinkagesContentContainer)
);
