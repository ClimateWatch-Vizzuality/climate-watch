import { createElement } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';

import Component from './country-ghg-emissions-component';

export { default as component } from './country-ghg-emissions-component';
export { default as styles } from './country-ghg-emissions-styles';

const mapStateToProps = () => ({
  stateProp: 'State prop'
});

const ComponentContainer = props =>
  createElement(Component, {
    ...props,
    myProp: 'And I am the prop'
  });

ComponentContainer.propTypes = {
  myProp: Proptypes.string
};

export default connect(mapStateToProps, null)(ComponentContainer);
