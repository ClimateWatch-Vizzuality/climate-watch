import React, { PureComponent } from 'react';
import EmissionPathwaysGraph from './emission-pathways-graph';

class DriversOfEmissions extends PureComponent {
  render() {
    return (
      <React.Fragment>
        <div style={{ height: '700px' }}>Drivers of emissions</div>
        <EmissionPathwaysGraph />
      </React.Fragment>
    );
  }
}

export default DriversOfEmissions;
