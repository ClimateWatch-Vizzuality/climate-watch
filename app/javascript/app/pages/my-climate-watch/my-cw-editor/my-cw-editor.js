import { createElement, PureComponent } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { parseInsight } from './my-cw-editor-selectors';
import * as actions from './my-cw-editor-actions';
import * as reducers from './my-cw-editor-reducers';
import MyClimateWatchComponent from './my-cw-editor-component';

const initialState = reducers.initialState;

const mapStateToProps = ({ login, myCWEditor }) => ({
  login,
  saved: myCWEditor.saved,
  loading: myCWEditor.loading,
  insight: parseInsight(myCWEditor)
});

class MyClimateWatchContainer extends PureComponent {
  componentWillMount() {
    const { insightId } = this.props.match.params;
    if (insightId) {
      this.props.getInsight(insightId);
    }
  }

  componentDidUpdate() {
    const { saved, history } = this.props;
    if (saved) {
      history.push('/my-climate-watch');
    }
  }

  componentWillUnmount() {
    this.props.clearInsight();
  }

  render() {
    return createElement(MyClimateWatchComponent, this.props);
  }
}

MyClimateWatchContainer.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
  saved: PropTypes.bool.isRequired,
  getInsight: PropTypes.func.isRequired,
  clearInsight: PropTypes.func.isRequired
};

export { actions, reducers, initialState };

export default withRouter(
  connect(mapStateToProps, actions)(MyClimateWatchContainer)
);
