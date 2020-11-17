import React, { PureComponent, Fragment } from 'react';
import sectorsScreenshot from 'assets/screenshots/sectors-screenshot';
import SEOTags from 'components/seo-tags';
import { SEO_PAGES } from 'data/seo-data';
import Teaser from 'components/teaser';

class Sectors extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Fragment>
        <SEOTags
          page={SEO_PAGES.sector}
          dynamicTitlePart={'Coming soon'}
          href={location.href}
        />
        <Teaser
          screenshot={sectorsScreenshot}
          title="Explore Different Sectors"
          description="A breakdown of historical greenhouse gas (GHG) emissions by economic sector. Explore by country and global shares, and use it to dive into future sector emissions projections."
        />
      </Fragment>
    );
  }
}

export default Sectors;
