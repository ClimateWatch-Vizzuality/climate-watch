import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { actions } from 'components/anchor-nav';
import { getAnchorLinks } from './sectors-agricuture-selectors';
import Component from './sectors-agriculture-component';

const mapStateToProps = (state, { route, location }) => {
  const routeData = { route, location, hash: location.hash };
  return {
    anchorLinks: getAnchorLinks(routeData)
  };
};

export default withRouter(connect(mapStateToProps, actions)(Component));
