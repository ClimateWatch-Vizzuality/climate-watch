import React, { PureComponent } from 'react';
import compareScreenshot from 'assets/screenshots/compare-screenshot';
import Teaser from 'components/teaser';

class CountryCompare extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Teaser
        screenshot={compareScreenshot}
        title="Compare Countries"
        description="Compare a snapshot of countries’ climate action progress, risks and vulnerability.<br /><br />Navigate through historical and future emissions, climate vulnerabilities and readiness, identify sustainable development linkages and make comparisons between countries."
      />
    );
  }
}

export default CountryCompare;
