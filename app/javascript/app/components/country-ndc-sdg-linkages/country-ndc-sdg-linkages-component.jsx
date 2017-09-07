import React, { PureComponent } from 'react';
import Proptypes from 'prop-types';

import SDGCard from 'components/sdg-card';
import ReactTooltip from 'react-tooltip';

import styles from './country-ndc-sdg-linkages-styles.scss';

class Component extends PureComponent {
  render() {
    const { sdg } = this.props;
    return (
      <div className={styles.wrapper}>
        <h1>Hi! I am ndc sdg linkages component, {this.props.myProp}</h1>
        <SDGCard sdg={sdg} />
        <ReactTooltip />
      </div>
    );
  }
}

Component.propTypes = {
  myProp: Proptypes.any,
  sdg: Proptypes.object
};

export default Component;
