import { createElement, Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as insightActions from 'pages/my-climate-watch/my-cw-editor/my-cw-editor-actions';
import MyInsightsComponent from './my-insights-component';
import initialState from './my-insights-initial-state';
import { parseInsights } from './my-insights-selectors';
import reducers from './my-insights-reducers';
import * as actions from './my-insights-actions';

const mapStateToProps = ({ insights, myCWEditor }) => ({
  loaded: insights.loaded,
  insights: parseInsights(insights),
  insight: myCWEditor.insight
});

class MyInsights extends Component {
  constructor(props) {
    super(props);
    props.fetchInsights();
  }

  componentWillReceiveProps({ insight, ...props }) {
    if (insight.deleted) {
      props.clearInsight();
      props.history.push('/my-climate-watch');
      props.fetchInsights();
    }
  }

  render() {
    return createElement(MyInsightsComponent, this.props);
  }
}

MyInsights.propTypes = {
  fetchInsights: PropTypes.func.isRequired,
  clearInsight: PropTypes.func.isRequired,
  history: PropTypes.object
};

export { actions, reducers, initialState };

export default connect(mapStateToProps, {
  ...actions,
  ...insightActions
})(MyInsights);
