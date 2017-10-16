import { PureComponent, createElement } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { actions } from 'providers/countries-provider';
import Component from './root-component';

const mapStateToProps = (state, { route }) => ({
  countriesLoaded: state.countries.loaded,
  navRoutes: route.routes.filter(r => r.nav)
});

class Root extends PureComponent {
  constructor(props) {
    super(props);
    props.getCountries();
  }

  render() {
    return this.props.countriesLoaded
      ? createElement(Component, this.props)
      : null;
  }
}

Root.propTypes = {
  getCountries: Proptypes.func,
  countriesLoaded: Proptypes.bool
};

export default withRouter(connect(mapStateToProps, actions)(Root));
