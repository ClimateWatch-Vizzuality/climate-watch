import React, { PureComponent } from 'react';
import ChartStackedArea from 'components/chart-stackedarea';

// import styles from './GhgEmissions-styles.scss';

class GhgEmissions extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <ChartStackedArea />
      </div>
    );
  }
}

GhgEmissions.propTypes = {};

export default GhgEmissions;
