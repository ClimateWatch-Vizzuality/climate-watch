import { createElement } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';

import Component from './country-ndc-sdg-linkages-component';

export { default as component } from './country-ndc-sdg-linkages-component';
export { default as styles } from './country-ndc-sdg-linkages-styles';

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
