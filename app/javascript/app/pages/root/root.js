import { PureComponent, createElement } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { actions } from 'providers/countries-provider';
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

const mapStateToProps = (state, { route }) => ({
  countriesLoaded: state.countries.loaded,
  navRoutes: route.routes.filter(r => r.nav)
});

class Root extends PureComponent {
  constructor(props) {
    super(props);
    props.getCountries();
  }

  componentDidMount() {
    handleTrack(this.props.location);
  }

  componentDidUpdate(prevProps) {
    handleTrack(this.props.location, prevProps.location);
  }

  render() {
    return this.props.countriesLoaded
      ? createElement(Component, this.props)
      : null;
  }
}

Root.propTypes = {
  getCountries: Proptypes.func,
  location: Proptypes.object.isRequired,
  countriesLoaded: Proptypes.bool
};

export default withRouter(connect(mapStateToProps, actions)(Root));
