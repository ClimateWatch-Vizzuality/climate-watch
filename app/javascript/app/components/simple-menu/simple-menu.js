import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import actions from 'components/web-tour/web-tour-actions';
import Component from './simple-menu-component';

const mapStateToProps = (state, { location }) => {
  const currentPathname = location && location.pathname;
  return {
    isTourOpen: state.tour.isOpen,
    currentPathname
  };
};

export default withRouter(connect(mapStateToProps, actions)(Component));
