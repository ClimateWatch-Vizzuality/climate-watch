import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// import styles from './ndc-sdg-linkages-list-styles.scss';

class NdcSdgLinkagesList extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const { goal } = this.props;
    return (
      <div>
        <div>{goal.title}</div>
        {goal.targets.map(target => <div key={target.id}>{target.title}</div>)}
      </div>
    );
  }
}

NdcSdgLinkagesList.propTypes = {
  goal: PropTypes.object.isRequired
};

export default NdcSdgLinkagesList;
