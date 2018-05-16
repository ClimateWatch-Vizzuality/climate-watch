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

export default connect(mapStateToProps)(Component);
