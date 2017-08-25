import { PureComponent, createElement } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { actions } from 'providers/countries-provider';
import Component from './container-component';

const mapStateToProps = state => ({
  countriesLoaded: state.countries.loaded
});

class Container extends PureComponent {
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

Container.propTypes = {
  getCountries: Proptypes.func,
  countriesLoaded: Proptypes.bool
};

export default connect(mapStateToProps, actions)(Container);
