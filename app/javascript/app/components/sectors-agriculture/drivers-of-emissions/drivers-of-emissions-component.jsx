import React, { PureComponent } from 'react';
import { Switch } from 'cw-components';
import PropTypes from 'prop-types';
import ExploreButtonGroup from 'components/sectors-agriculture/explore-group/explore-group';
import Chart from 'components/charts/chart';
import Dropdown from 'components/dropdown';
import RegionsProvider from 'providers/regions-provider/regions-provider';
import CountriesProvider from 'providers/countries-provider/countries-provider';
import EmissionsProvider from 'providers/emissions-provider';
import AgricultureEmissionsProvider from 'providers/agriculture-emissions-provider/agriculture-emissions-provider';
import { TabletLandscape, TabletPortraitOnly } from 'components/responsive';
import * as styles from './drivers-of-emissions-styles.scss';
import CardPieChart from './card-pie-chart/card-pie-chart-component';
import { emissionTabs } from './drivers-of-emissions-data';

class DriversOfEmissions extends PureComponent {
  renderFilters = () => {
    const { locations, handleCountryChange, emissionsCountry } = this.props;
    return (
      <div>
        <Dropdown
          key="locations"
          label="Country/Region"
          className={styles.dropdown}
          options={locations}
          onValueChange={handleCountryChange}
          value={emissionsCountry}
          hideResetButton
        />
      </div>
    );
  };

  renderEmissionsChart = () => {
    const { config, data, domain, filters } = this.props;
    return (
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
        forceFixedFormatDecimals="3"
        espGraph
      />
    );
  };

  renderPieChart = () => {
    const { pieChartData } = this.props;
    return (
      <CardPieChart
        theme={{
          card: styles.fixedCard,
          contentContainer: styles.fixedCardContentContainer,
          data: styles.fixedCardData
        }}
        pieChartData={pieChartData}
      />
    );
  };

  renderExploreButtonGroup = () => {
    const buttonGroupConfig = [
      { type: 'info' },
      { type: 'share' },
      { type: 'download' },
      { type: 'addToUser' }
    ];
    return (
      <ExploreButtonGroup
        exploreButtonText="Explore emissions"
        buttonGroupConfig={buttonGroupConfig}
      />
    );
  };

  render() {
    const {
      handleTabChange,
      activeTab,
      emissionsCountry,
      ghgEmissionsFilters,
      pieChartData
    } = this.props;
    const agriculturePercentage =
      pieChartData && pieChartData.emissionPercentage;

    return (
      <div>
        <RegionsProvider />
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
                activities. Explore the history and potential future pathways of
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
              <div className={styles.landscapeContent}>
                {this.renderFilters()}
                {this.renderExploreButtonGroup()}
              </div>
              <div className={styles.landscapeContent}>
                {this.renderEmissionsChart()}
                {this.renderPieChart()}
              </div>
            </TabletLandscape>
            <TabletPortraitOnly>
              <div className={styles.portraitContent}>
                {this.renderFilters()}
                {this.renderEmissionsChart()}
                {this.renderExploreButtonGroup()}
                {this.renderPieChart()}
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
  locations: PropTypes.array,
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
  locations: [],
  ghgEmissionsFilters: {},
  pieChartData: null
};

export default DriversOfEmissions;
