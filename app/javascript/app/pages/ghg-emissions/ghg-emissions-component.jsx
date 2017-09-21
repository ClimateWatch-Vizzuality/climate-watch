import React, { PureComponent } from 'react';
import cx from 'classnames';

import Header from 'components/header';
import Intro from 'components/intro';
import GhgEmissionsGraph from 'components/ghg-emissions';

import background from 'assets/backgrounds/home_bg_1';
import layout from 'styles/layout.scss';
import styles from './ghg-emissions-styles.scss';

class GhgEmissions extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Header image={background}>
          <div className={cx(layout.content, styles.header)}>
            <Intro title="Historical GHG Emissions" />
          </div>
        </Header>
        <div className={layout.content}>
          <GhgEmissionsGraph />
        </div>
      </div>
    );
  }
}

GhgEmissions.propTypes = {};

export default GhgEmissions;
