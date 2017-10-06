import React, { PureComponent } from 'react';
import Intro from 'components/intro';
import Button from 'components/button';

import styles from './country-ndc-overview-styles.scss';

class CountryNdcOverview extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Intro
          title="NDC Content Overview"
          description="Brazil intends to commit to reduce greenhouse gas emissions by 37% below 2005 levels in 2025, with an indicative goal to reduce GHG emissions by 43% by 2030, relative to 2005 levels."
        />
        <Button
          className={styles.exploreBtn}
          color="white"
          link={'/ghg-emissions?breakBy=location&filter='}
        >
          Explore emissions
        </Button>
        <Button
          className={styles.exploreBtn}
          color="yellow"
          link={'/ghg-emissions?breakBy=location&filter='}
        >
          Explore emissions
        </Button>
      </div>
    );
  }
}

CountryNdcOverview.propTypes = {};

export default CountryNdcOverview;
