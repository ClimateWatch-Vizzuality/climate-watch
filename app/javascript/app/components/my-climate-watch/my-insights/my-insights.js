import { createElement, Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import MyInsightsComponent from './my-insights-component';
import initialState from './my-insights-initial-state';
import reducers from './my-insights-reducers';
import { parseInsights } from './my-insights-selectors';
import * as actions from './my-insights-actions';

const mapStateToProps = ({ insights }) => ({
  insights: parseInsights(insights)
});

class MyInsights extends Component {
  constructor(props) {
    super(props);
    props.fetchInsights();
  }

  render() {
    return createElement(MyInsightsComponent, this.props);
  }
}

MyInsights.propTypes = {
  fetchInsights: PropTypes.func.isRequired
};

export { actions, reducers, initialState };

export default connect(mapStateToProps, actions)(MyInsights);
