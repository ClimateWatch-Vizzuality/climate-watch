import React, { PureComponent } from 'react';
import Proptypes from 'prop-types';

class Data extends PureComponent {
  render() {
    const { children } = this.props;
    return (
      <div>
        {children}
      </div>
    );
  }
}

Data.propTypes = {
  children: Proptypes.node
};

export default Data;
