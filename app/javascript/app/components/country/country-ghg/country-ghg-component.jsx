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
import { isPageContained } from 'utils/navigation';
import cx from 'classnames';

import layout from 'styles/layout';
import styles from './country-ghg-styles.scss';

const FEATURE_QUANTIFICATIONS = process.env.FEATURE_QUANTIFICATIONS === 'true';
const showDisclaimer = FEATURE_QUANTIFICATIONS && !isPageContained;

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
    const { search, isEmbedded } = this.props;
    const needsWBData =
      search.calculation &&
      search.calculation !== CALCULATION_OPTIONS.ABSOLUTE_VALUE.value;
    return (
      <div>
        <div className={cx(styles.grid, { [styles.embedded]: isEmbedded })}>
          <EmissionsMetaProvider />
          {needsWBData && <WbCountryDataProvider />}
          <CountryGHGEmissions handleYearHover={this.handleYearHover} />
          <TabletLandscape>
            {!isEmbedded && (
              <div className={styles.map}>
                <CountryGHGMap
                  search={search}
                  className={styles.map}
                  year={this.state.year}
                />
              </div>
            )}
          </TabletLandscape>
        </div>
        {showDisclaimer && (
          <Disclaimer className={cx(styles.disclaimer, layout.content)} />
        )}
        <ModalMetadata disclaimer={<Disclaimer onlyText />} />
      </div>
    );
  }
}

CountryGhg.propTypes = {
  search: PropTypes.object,
  isEmbedded: PropTypes.bool
};

export default CountryGhg;
