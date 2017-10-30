import React, { PureComponent } from 'react';
import emissionPathwaysScreenshot from 'assets/screenshots/emission-pathways-screenshot';
import Teaser from 'components/teaser';

class EmissionPathways extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Teaser
        screenshot={emissionPathwaysScreenshot}
        title="Explore Emission Pathways"
        description="Easily visualize a range of future emission pathways linked to different scenarios of economic and energy developments, drawing from a variety of modeling tools. If you are interested to learn more about the tool or if you are a model developer and would like to make your data available on it, please contact <a href='mailto:Roman.Hennig@wri.org'>Roman Hennig</a>."
      />
    );
  }
}

export default EmissionPathways;
