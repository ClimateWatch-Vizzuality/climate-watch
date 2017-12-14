import { createElement, Component } from 'react';
import { connect } from 'react-redux';

import MyInsightsComponent from './my-insights-component';
import initialState from './my-insights-initial-state';
import reducers from './my-insights-reducers';
import * as actions from './my-insights-actions';

class MyInsights extends Component {
  constructor(props) {
    super(props);
    props.fetchStories();
  }

  render() {
    return createElement(MyInsightsComponent, this.props);
  }
}

const mapStateToProps = ({ insights }) => ({ insights });

export { actions, reducers, initialState };

export default connect(mapStateToProps, actions)(MyInsights);
