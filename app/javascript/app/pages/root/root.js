import { PureComponent, createElement } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { actions } from 'providers/countries-provider';
import ReactGA from 'react-ga';
import Component from './root-component';

const mapStateToProps = (state, { route }) => ({
  countriesLoaded: state.countries.loaded,
  navRoutes: route.routes.filter(r => r.nav)
});

class Root extends PureComponent {
  constructor(props) {
    super(props);
    props.getCountries();
    const page = props.location.pathname;
    this.trackPage(page);
  }

  componentDidMount() {
    ReactGA.initialize('UA-1981881-51');
  }

  componentDidUpdate(nextProps) {
    const page = this.props.location.pathname;
    const newPage = nextProps.location.pathname;

    if (page !== newPage) {
      this.trackPage(page);
    }
  }

  trackPage = page => {
    ReactGA.set({ page });
    ReactGA.pageview(page);
  };

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
