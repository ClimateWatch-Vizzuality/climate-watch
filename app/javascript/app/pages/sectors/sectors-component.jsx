import React, { PureComponent } from 'react';
import sectorsScreenshot from 'assets/screenshots/sectors-screenshot';
import Teaser from 'components/teaser';

class Sectors extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Teaser
        screenshot={sectorsScreenshot}
        title="Explore the sectoral cuts"
        description="Text to change: Check each the sectoral cuts lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      />
    );
  }
}

export default Sectors;
