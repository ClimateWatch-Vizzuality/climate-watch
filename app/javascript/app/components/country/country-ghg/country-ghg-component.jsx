import React, { PureComponent } from 'react';
import CountryGHGEmissions from 'components/country/country-ghg-emissions';
import CountryGHGMap from 'components/country/country-ghg-map';
import EmissionsMetaProvider from 'providers/ghg-emissions-meta-provider';
import WbCountryDataProvider from 'providers/wb-country-data-provider';
import PropTypes from 'prop-types';
import throttle from 'lodash/throttle';
import { CALCULATION_OPTIONS } from 'app/data/constants';
import { TabletLandscape } from 'components/responsive';
import Disclaimer from 'components/disclaimer';
import ModalMetadata from 'components/modal-metadata';
import cx from 'classnames';

import layout from 'styles/layout';
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
      <div>
        <div className={styles.grid}>
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
        <Disclaimer className={cx(styles.disclaimer, layout.content)} />
        <ModalMetadata disclaimer={<Disclaimer onlyText />} />
      </div>
    );
  }
}

CountryGhg.propTypes = {
  search: PropTypes.object
};

export default CountryGhg;
