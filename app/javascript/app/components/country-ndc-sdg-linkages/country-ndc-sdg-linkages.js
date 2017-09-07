import { createElement } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';

import Component from './country-ndc-sdg-linkages-component';

export { default as component } from './country-ndc-sdg-linkages-component';
export { default as styles } from './country-ndc-sdg-linkages-styles';

const sdg = {
  index: '1',
  title: 'No poverty',
  color: 'red',
  sections: [
    {
      number: 1.1,
      title:
        'By 2030, eradicate extreme poverty for all people everywhere, currently measured as people living on less than $1.25 a day',
      sectors: [77, 76, 75]
    },
    {
      number: 1.2,
      title:
        'By 2030, reduce at least by half the proportion of men, women and children of all ages living in poverty in all its dimensions according to national definitions'
    }
  ]
};

const mapStateToProps = () => ({
  stateProp: 'State prop',
  sdg
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
