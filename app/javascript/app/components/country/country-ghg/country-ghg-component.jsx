import React, { PureComponent } from 'react';
import CountryGHGEmissions from 'components/country/country-ghg-emissions';
import CountryGHGMap from 'components/country/country-ghg-map';
import EmissionsMetaProvider from 'providers/ghg-emissions-meta-provider';
import WbCountryDataProvider from 'providers/wb-country-data-provider';
import cx from 'classnames';
import PropTypes from 'prop-types';
import throttle from 'lodash/throttle';
import { CALCULATION_OPTIONS } from 'app/data/constants';
import { TabletLandscape } from 'components/responsive';

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

  handleYearHover = throttle(year => {
    if (year) {
      this.setState({ year });
    }
  }, 10);

  render() {
    const { search } = this.props;
    const needsWBData =
      search.calculation &&
      search.calculation !== CALCULATION_OPTIONS.ABSOLUTE_VALUE.value;
    return (
      <div className={cx(layout.content, styles.grid)}>
        <EmissionsMetaProvider />
        {needsWBData && <WbCountryDataProvider />}
        <CountryGHGEmissions handleYearHover={this.handleYearHover} />
        <TabletLandscape>
          <div className={styles.map}>
            <CountryGHGMap
              search={search}
              className={styles.map}
              year={this.state.year}
            />
          </div>
        </TabletLandscape>
      </div>
    );
  }
}

CountryGhg.propTypes = {
  search: PropTypes.object
};

export default CountryGhg;
