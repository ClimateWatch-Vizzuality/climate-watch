import React, { PureComponent } from 'react';
import Proptypes from 'prop-types';

import styles from './country-ndc-sdg-linkages-styles.scss';

class Component extends PureComponent {
  render() {
    return (
      <div className={styles.wrapper}>
        <h1>Hi! I am ndc sdg linkages component, {this.props.myProp}</h1>
      </div>
    );
  }
}

Component.propTypes = {
  myProp: Proptypes.any
};

export default Component;
