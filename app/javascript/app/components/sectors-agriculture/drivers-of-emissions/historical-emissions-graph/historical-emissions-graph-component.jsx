import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ExploreButtonGroup from 'components/sectors-agriculture/drivers-of-emissions/explore-group/explore-group';
import Chart from 'components/charts/chart';
import Dropdown from 'components/dropdown';
import RegionsProvider from 'providers/regions-provider/regions-provider';
import CountriesProvider from 'providers/countries-provider/countries-provider';
import EmissionsProvider from 'providers/emissions-provider';
import AgricultureEmissionsProvider from 'providers/agriculture-emissions-provider/agriculture-emissions-provider';
import { TabletLandscape, TabletPortraitOnly } from 'components/responsive';
import * as styles from './historical-emissions-graph-styles.scss';
import CardPieChart from '../card-pie-chart/card-pie-chart-component';

class HistoricalEmissionsGraph extends PureComponent {
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
        height={400}
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
    const { emissionsCountry, ghgEmissionsFilters } = this.props;

    return (
      <div>
        <RegionsProvider />
        <CountriesProvider />
        <AgricultureEmissionsProvider
          isoCode3={emissionsCountry && emissionsCountry.value}
        />
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
  config: PropTypes.object.isRequired,
  data: PropTypes.array,
  domain: PropTypes.object.isRequired,
  filters: PropTypes.array,
  locations: PropTypes.array,
  emissionsCountry: PropTypes.object.isRequired,
  ghgEmissionsFilters: PropTypes.object,
  pieChartData: PropTypes.object
};

HistoricalEmissionsGraph.defaultProps = {
  handleCountryChange: () => {},
  config: PropTypes.object.isRequired,
  data: [],
  filters: [],
  locations: [],
  ghgEmissionsFilters: {},
  pieChartData: null
};

export default HistoricalEmissionsGraph;
