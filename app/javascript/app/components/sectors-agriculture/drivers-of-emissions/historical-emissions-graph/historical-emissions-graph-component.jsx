import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ExploreButtonGroup from 'components/sectors-agriculture/drivers-of-emissions/explore-group/explore-group';
import Chart from 'components/charts/chart';
import Dropdown from 'components/dropdown';
import RegionsProvider from 'providers/regions-provider/regions-provider';
import CountriesProvider from 'providers/countries-provider/countries-provider';
import EmissionsMetaProvider from 'providers/ghg-emissions-meta-provider';
import EmissionsProvider from 'providers/emissions-provider';
import AgricultureEmissionsProvider from 'providers/agriculture-emissions-provider/agriculture-emissions-provider';
import { TabletLandscape, TabletPortraitOnly } from 'components/responsive';
import styles from './historical-emissions-graph-styles.scss';
import CardPieChart from '../card-pie-chart/card-pie-chart-component';

class HistoricalEmissionsGraph extends PureComponent {
  renderFilters = () => {
    const {
      locations,
      handleCountryChange,
      emissionsCountry,
      emissionTypes,
      handleEmissionTypeChange,
      emissionType
    } = this.props;
    return (
      <div className={styles.filtersGroup}>
        <Dropdown
          key="locations"
          label="Country/Region"
          className={styles.dropdown}
          options={locations}
          onValueChange={handleCountryChange}
          value={emissionsCountry}
          hideResetButton
        />
        <Dropdown
          key="emissions"
          label="Emissions"
          className={styles.dropdown}
          options={emissionTypes}
          onValueChange={handleEmissionTypeChange}
          value={emissionType}
          hideResetButton
          noAutoSort
        />
      </div>
    );
  };

  renderEmissionsChart = () => {
    const {
      config,
      data,
      domain,
      filters,
      filtersSelected,
      loading
    } = this.props;
    return (
      <Chart
        className={styles.chartWrapper}
        type="line"
        config={config}
        data={data}
        domain={domain}
        dataOptions={filters}
        dataSelected={filtersSelected}
        height={430}
        dot={false}
        forceFixedFormatDecimals={3}
        espGraph
        loading={loading && !data}
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
    const { emissionsCountry, ghgEmissionsFilters } = this.props;
    return (
      <div>
        <RegionsProvider />
        <CountriesProvider />
        <AgricultureEmissionsProvider
          isoCode3={emissionsCountry && emissionsCountry.value}
        />
        <EmissionsMetaProvider />
        <EmissionsProvider filters={ghgEmissionsFilters} />
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
    );
  }
}

HistoricalEmissionsGraph.propTypes = {
  handleCountryChange: PropTypes.func,
  handleEmissionTypeChange: PropTypes.func,
  config: PropTypes.object,
  data: PropTypes.array,
  domain: PropTypes.object,
  filters: PropTypes.array,
  filtersSelected: PropTypes.array,
  locations: PropTypes.array,
  emissionsCountry: PropTypes.object,
  ghgEmissionsFilters: PropTypes.object,
  pieChartData: PropTypes.object,
  emissionTypes: PropTypes.array,
  emissionType: PropTypes.object,
  loading: PropTypes.bool
};

HistoricalEmissionsGraph.defaultProps = {
  handleCountryChange: () => {},
  handleEmissionTypeChange: () => {},
  config: null,
  domain: null,
  data: [],
  filters: [],
  filtersSelected: [],
  locations: [],
  ghgEmissionsFilters: {},
  pieChartData: null,
  emissionsCountry: null,
  emissionTypes: [],
  emissionType: null,
  loading: false
};

export default HistoricalEmissionsGraph;
