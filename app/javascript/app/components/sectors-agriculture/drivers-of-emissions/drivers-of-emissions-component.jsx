import React, { PureComponent } from 'react';
import { Switch } from 'cw-components';
import PropTypes from 'prop-types';
import ExploreButtonGroup from 'components/sectors-agriculture/explore-group/explore-group';
import Chart from 'components/charts/chart';
import Dropdown from 'components/dropdown';
import CountriesProvider from 'providers/countries-provider/countries-provider';
import EmissionsProvider from 'providers/emissions-provider';
import AgricultureEmissionsProvider from 'providers/agriculture-emissions-provider/agriculture-emissions-provider';
import { TabletLandscape, TabletPortraitOnly } from 'components/responsive';
import * as styles from './drivers-of-emissions-styles.scss';
import CardPieChart from './card-pie-chart/card-pie-chart-component';
import { emissionTabs } from './drivers-of-emissions-data';

const theme = {
  card: styles.fixedCard,
  contentContainer: styles.fixedCardContentContainer,
  data: styles.fixedCardData
};

class DriversOfEmissions extends PureComponent {
  render() {
    const {
      handleTabChange,
      activeTab,
      config,
      data,
      domain,
      filters,
      countries,
      handleCountryChange,
      emissionsCountry,
      ghgEmissionsFilters,
      pieChartData
    } = this.props;
    const agriculturePercentage =
      pieChartData && pieChartData.emissionPercentage;

    return (
      <div>
        <CountriesProvider />
        <AgricultureEmissionsProvider
          isoCode3={emissionsCountry && emissionsCountry.value}
        />
        <EmissionsProvider filters={ghgEmissionsFilters} />
        <div className={styles.content}>
          <div className={styles.header}>
            <h2>Drivers of emissions</h2>
            <div className={styles.intro}>
              <p>
                Many processes result in agricultural emissions, with
                fermentation, manure and rice cultivation contributing the major
                share{agriculturePercentage && ` (${agriculturePercentage})`}.
                This graph contains all the emissions produced in the different
                agricultural emissions sub-domains, providing a picture of the
                contribution to the total amount of GHG emissions from
                agriculture. GHG emissions from agriculture consist of non-CO<sub>2</sub>{' '}
                gases produced by crop and livestock production and management
                activities. Explore the history and potential future pathways of
                those drivers.
              </p>
              <Switch
                options={emissionTabs}
                selectedOption={activeTab}
                onClick={handleTabChange}
                theme={{
                  wrapper: styles.switch,
                  checkedOption: styles.switchSelected
                }}
              />
            </div>
          </div>
          <div>
            <TabletLandscape>
              <div className={styles.navigationSection}>
                <div>
                  <Dropdown
                    key="Country"
                    label="Country"
                    className={styles.dropdown}
                    options={countries}
                    onValueChange={handleCountryChange}
                    value={emissionsCountry}
                    hideResetButton
                  />
                </div>
                <ExploreButtonGroup
                  exploreButtonText="Explore emissions"
                  iso={emissionsCountry && emissionsCountry.value}
                />
              </div>
              <div className={styles.navigationSection}>
                <Chart
                  className={styles.chartWrapper}
                  type="line"
                  config={config}
                  data={data}
                  domain={domain}
                  dataOptions={filters}
                  dataSelected={filters}
                  height={430}
                  dot={false}
                />
                <CardPieChart theme={theme} pieChartData={pieChartData} />
              </div>
            </TabletLandscape>
            <TabletPortraitOnly>
              <div className={styles.graphControlsSection}>
                <ExploreButtonGroup exploreButtonText="Explore emissions" />
                <Chart
                  className={styles.chartWrapper}
                  type="line"
                  config={config}
                  data={data}
                  domain={domain}
                  dataOptions={filters}
                  dataSelected={filters}
                  height={430}
                  dot={false}
                />
                <CardPieChart theme={theme} pieChartData={pieChartData} />
              </div>
            </TabletPortraitOnly>
          </div>
        </div>
      </div>
    );
  }
}

DriversOfEmissions.propTypes = {
  handleTabChange: PropTypes.func,
  handleCountryChange: PropTypes.func,
  activeTab: PropTypes.string,
  config: PropTypes.object.isRequired,
  data: PropTypes.array,
  domain: PropTypes.object.isRequired,
  filters: PropTypes.array,
  countries: PropTypes.array,
  emissionsCountry: PropTypes.object.isRequired,
  ghgEmissionsFilters: PropTypes.object,
  pieChartData: PropTypes.object
};

DriversOfEmissions.defaultProps = {
  handleTabChange: () => {},
  handleCountryChange: () => {},
  activeTab: emissionTabs[0],
  config: PropTypes.object.isRequired,
  data: [],
  filters: [],
  countries: [],
  // emissionsCountry: 'WORLD',
  ghgEmissionsFilters: {},
  pieChartData: null
};

export default DriversOfEmissions;
