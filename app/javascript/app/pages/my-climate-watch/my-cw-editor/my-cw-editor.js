import { createElement, PureComponent } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from './my-cw-editor-actions';
import reducers, { initialState } from './my-cw-editor-reducers';

import MyClimateWatchComponent from './my-cw-editor-component';

const mapStateToProps = ({ login, myCWEditor }) => ({
  login,
  myCWEditor
});

class MyClimateWatchContainer extends PureComponent {
  componentDidUpdate() {
    const { myCWEditor, history } = this.props;
    if (myCWEditor.saved) {
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
  myCWEditor: PropTypes.object,
  history: PropTypes.object,
  clearInsight: PropTypes.func.isRequired
};

export { actions, reducers, initialState };

export default withRouter(
  connect(mapStateToProps, actions)(MyClimateWatchContainer)
);
