import React, { PureComponent } from 'react';
import compareScreenshot from 'assets/screenshots/compare-screenshot';
import Teaser from 'components/teaser';

class CountryCompare extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Teaser
        screenshot={compareScreenshot}
        title="Compare countries information"
        description="Text to change: Check the comparison between countries lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      />
    );
  }
}

export default CountryCompare;
