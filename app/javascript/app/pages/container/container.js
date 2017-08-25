import { PureComponent, createElement } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { actions } from 'providers/countries-provider';
import Component from './container-component';

class Container extends PureComponent {
  constructor(props) {
    super(props);
    props.getCountries();
  }

  render() {
    return createElement(Component, this.props);
  }
}

Container.propTypes = {
  getCountries: Proptypes.func
};

export default connect(null, actions)(Container);
