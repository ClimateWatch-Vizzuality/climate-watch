import { PureComponent, createElement } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ReactGA from 'react-ga';
import Component from './root-component';

const { GOOGLE_ANALYTICS_ID } = process.env;

function trackPage(page) {
  ReactGA.set({ page });
  ReactGA.pageview(page);
}

let gaInitialized = false;
function handleTrack(location, prevLocation) {
  if (GOOGLE_ANALYTICS_ID) {
    if (!gaInitialized) {
      ReactGA.initialize(GOOGLE_ANALYTICS_ID);
      gaInitialized = true;
    }
    if (!prevLocation) {
      trackPage(location.pathname);
    } else {
      const page = location.pathname;
      const prevPage = prevLocation.pathname;

      if (page !== prevPage) {
        trackPage(page);
      }
    }
  }
}

// Path routes exclude menu groups
const mapStateToProps = (state, { route }) => ({
  countriesLoaded: state.countries.loaded,
  navRoutes: route.routes.filter(r => r.nav),
  pathRoutes: route.routes.filter(r => r.path)
});

class Root extends PureComponent {
  componentDidMount() {
    handleTrack(this.props.location);
  }

  componentDidUpdate(prevProps) {
    handleTrack(this.props.location, prevProps.location);
  }

  render() {
    return createElement(Component, this.props);
  }
}

Root.propTypes = {
  location: Proptypes.object.isRequired
};

export default withRouter(connect(mapStateToProps)(Root));
