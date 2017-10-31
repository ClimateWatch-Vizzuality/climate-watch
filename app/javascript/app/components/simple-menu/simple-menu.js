import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import Component from './simple-menu-component';

const mapStateToProps = (state, { location }) => {
  const currentPathname = location && location.pathname;
  return {
    currentPathname
  };
};

export default withRouter(connect(mapStateToProps, null)(Component));
