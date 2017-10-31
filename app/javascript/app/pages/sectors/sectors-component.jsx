import React, { PureComponent } from 'react';
import sectorsScreenshot from 'assets/screenshots/sectors-screenshot';
import Teaser from 'components/teaser';

class Sectors extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Teaser
        screenshot={sectorsScreenshot}
        title="Explore Different Sectors"
        description="A breakdown of historical greenhouse gas (GHG) emissions by economic sector. Explore by country and global shares, and use it to dive into future sector emissions projections."
      />
    );
  }
}

export default Sectors;
