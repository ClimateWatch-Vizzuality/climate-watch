import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import Component from './app-component';

const mapStateToProps = (state, { route }) => ({
  countriesLoaded: state.countries.loaded,
  navRoutes: route.routes.filter(r => r.nav),
  pathRoutes: route.routes.filter(r => r.path)
});

export default withRouter(connect(mapStateToProps)(Component));
