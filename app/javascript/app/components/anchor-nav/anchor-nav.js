import { connect } from 'react-redux';
import Component from './anchor-nav-component';
import actions from './anchor-nav-actions';
import reducers, { initialState } from './anchor-nav-reducers';

export { actions, reducers, initialState };

const mapStateToProps = state => {
  const { anchorNav } = state;
  return {
    activeSection: anchorNav.activeSection
  };
};

// explanation to pure: false prop on connect could be found here
// https://github.com/ReactTraining/react-router/issues/3536#issuecomment-225586661
export default connect(mapStateToProps, null, null, { pure: false })(Component);
