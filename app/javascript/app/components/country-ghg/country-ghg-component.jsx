import React, { PureComponent } from 'react';
import GHGCountryEmissions from 'components/country-ghg-emissions';
import GHGCountryMap from 'components/country-ghg-map';
import EmissionsMetaProvider from 'providers/ghg-emissions-meta-provider';
import cx from 'classnames';

import layout from 'styles/layout.scss';
import styles from './country-ghg-styles.scss';

class CountryGhg extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className={cx(layout.content, styles.grid)}>
        <EmissionsMetaProvider />
        <GHGCountryEmissions />
        <GHGCountryMap className={styles.map} />
      </div>
    );
  }
}

CountryGhg.propTypes = {};

export default CountryGhg;
