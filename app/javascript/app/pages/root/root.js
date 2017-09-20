import { PureComponent, createElement } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { actions as regionActions } from 'providers/regions-provider';
import { actions as countriesActions } from 'providers/countries-provider';
import Component from './root-component';

const actions = { ...regionActions, ...countriesActions };

const mapStateToProps = state => ({
  countriesLoaded: state.countries.loaded
});

class Root extends PureComponent {
  constructor(props) {
    super(props);
    props.getCountries();
    props.getRegions();
  }

  render() {
    return this.props.countriesLoaded
      ? createElement(Component, this.props)
      : null;
  }
}

Root.propTypes = {
  getRegions: Proptypes.func,
  getCountries: Proptypes.func,
  countriesLoaded: Proptypes.bool
};

export default withRouter(connect(mapStateToProps, actions)(Root));
