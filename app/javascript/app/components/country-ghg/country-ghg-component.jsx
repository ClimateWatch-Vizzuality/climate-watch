import React, { PureComponent } from 'react';
import GHGCountryEmissions from 'components/country-ghg-emissions';
import GHGCountryMap from 'components/country-ghg-map';
import EmissionsMetaProvider from 'providers/ghg-emissions-meta-provider';
import cx from 'classnames';
import throttle from 'lodash/throttle';

import layout from 'styles/layout.scss';
import styles from './country-ghg-styles.scss';

class CountryGhg extends PureComponent {
  constructor() {
    super();
    // Local state because of the performance
    this.state = {
      year: null
    };
  }

  handleYearHover = throttle(data => {
    if (data) {
      this.setState({ year: data.activeLabel });
    }
  }, 10);

  render() {
    return (
      <div className={cx(layout.content, styles.grid)}>
        <EmissionsMetaProvider />
        <GHGCountryEmissions handleYearHover={this.handleYearHover} />
        <GHGCountryMap className={styles.map} year={this.state.year} />
      </div>
    );
  }
}

CountryGhg.propTypes = {};

export default CountryGhg;
