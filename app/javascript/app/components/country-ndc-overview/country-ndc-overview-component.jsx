import React, { PureComponent } from 'react';
import Button from 'components/button';
import Card from 'components/card';
import Intro from 'components/intro';
import cx from 'classnames';

import introTheme from 'styles/themes/intro/intro-simple.scss';
import layout from 'styles/layout.scss';
import styles from './country-ndc-overview-styles.scss';

class CountryNdcOverview extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className={styles.wrapper}>
        <div className={layout.content}>
          <div className={cx(styles.header, styles.col2)}>
            <Intro
              theme={introTheme}
              title="NDC Content Overview"
              description="Brazil intends to commit to reduce greenhouse gas emissions by 37% below 2005 levels in 2025, with an indicative goal to reduce GHG emissions by 43% by 2030, relative to 2005 levels."
            />
            <div className={styles.actions}>
              <Button
                className={styles.exploreBtn}
                color="white"
                link={'/ghg-emissions?breakBy=location&filter='}
              >
                Compare
              </Button>
              <Button
                className={styles.exploreBtn}
                color="yellow"
                link={'/ghg-emissions?breakBy=location&filter='}
              >
                See more
              </Button>
            </div>
          </div>
          <h4 className={styles.subTitle}>Mitigation contribution</h4>
          <div className={styles.cards}>
            <Card title="GHG target">
              <div>test</div>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

CountryNdcOverview.propTypes = {};

export default CountryNdcOverview;
