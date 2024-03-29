import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import EspLocationsProvider from 'providers/esp-locations-provider';
import EspModelsProvider from 'providers/esp-models-provider';
import EspScenariosProvider from 'providers/esp-scenarios-provider';
import EspIndicatorsProvider from 'providers/esp-indicators-provider';
import EspTimeSeriesProvider from 'providers/esp-time-series-provider';
import ModalOverview from 'components/modal-overview';
import Dropdown from 'components/dropdown';
import Chart from 'components/charts/chart';
import { TabletLandscape, TabletPortraitOnly } from 'components/responsive';
import legendChartTheme from 'styles/themes/chart/legend-chart.scss';
import ModalPngDownload from 'components/modal-png-download';

import ExploreButtonGroup from '../explore-group';
import styles from './emission-pathways-graph-styles.scss';

class AgricultureEmissionPathwayGraph extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  renderCustomMessage() {
    const { filtersSelected, handleClearSelection } = this.props;
    const getName = attribute =>
      filtersSelected[attribute] && filtersSelected[attribute].label;
    const unavailableIndicatorName = getName('indicator')
      ? ` , ${getName('indicator')}`
      : '';
    return (
      <span>
        {`${getName(
          'location'
        )} doesn't have any agriculture data for ${getName(
          'model'
        )}${unavailableIndicatorName}. `}
        <button
          onClick={handleClearSelection}
          type="button"
          className={styles.clearButton}
        >
          Clear Selection
        </button>
      </span>
    );
  }

  renderExploreButtonGroup = () => {
    const {
      downloadLink,
      handleInfoClick,
      explorePathwaysConfig,
      handlePngDownloadModal
    } = this.props;
    const buttonGroupConfig = [
      {
        type: 'info',
        onClick: handleInfoClick
      },
      {
        type: 'share',
        shareUrl: '/embed/agriculture-emission/pathways',
        analyticsGraphName: 'Drivers of Emissions',
        positionRight: true
      },
      {
        type: 'downloadCombo',
        options: [
          {
            label: 'Save as image (PNG)',
            action: handlePngDownloadModal
          },
          {
            label: 'Go to data explorer',
            link: downloadLink,
            target: '_self'
          }
        ]
      },
      {
        type: 'addToUser'
      }
    ];
    return (
      <ExploreButtonGroup
        exploreButtonText="Explore pathways"
        exploreButtonConfig={explorePathwaysConfig}
        buttonGroupConfig={buttonGroupConfig}
        theme={{ container: styles.buttonGroupContainer }}
      />
    );
  };

  render() {
    const {
      data,
      domain,
      config,
      loading,
      error,
      filtersLoading,
      filtersOptions,
      filtersSelected,
      handleSelectorChange,
      modalData,
      model,
      handleModelChange,
      handleSubcategoryChange,
      handleCurrentLocationChange,
      pngSelectionSubtitle,
      pngDownloadId
    } = this.props;
    const needsTimeSeries =
      filtersSelected && filtersSelected.location && filtersSelected.model;
    const filtersDisabled =
      filtersLoading.indicators ||
      filtersLoading.timeseries ||
      filtersLoading.models;
    const renderChart = png => (
      <Chart
        className={styles.chartWrapper}
        type="line"
        config={{ ...config, legendNote: !png, pngVariant: png }}
        data={data}
        domain={domain}
        dataOptions={filtersOptions.scenarios}
        dataSelected={filtersSelected.scenario}
        customMessage={this.renderCustomMessage()}
        height={600}
        loading={loading}
        error={error}
        targetParam="scenario"
        customD3Format={'.3f'}
        margin={{ top: 50 }}
        espGraph
        model={model || null}
        theme={legendChartTheme}
      />
    );
    return (
      <div className={styles.wrapper}>
        <EspModelsProvider />
        <EspScenariosProvider />
        <EspIndicatorsProvider />
        <EspLocationsProvider withTimeSeries />
        {needsTimeSeries && (
          <EspTimeSeriesProvider
            location={filtersSelected.location.value}
            model={filtersSelected.model.value}
          />
        )}
        <div className="grid-column-item">
          <div className={styles.selectorsWrapper}>
            <div className={styles.filtersGroup}>
              <Dropdown
                label="Region"
                options={filtersOptions.locations}
                onValueChange={handleCurrentLocationChange}
                value={filtersSelected.location}
                hideResetButton
              />
              <Dropdown
                label="Model and scenarios"
                options={filtersOptions.models}
                onValueChange={handleModelChange}
                disabled={filtersLoading.location}
                value={filtersSelected.model}
                hideResetButton
              />
              <Dropdown
                label="Subcategory"
                placeholder="Select a subcategory"
                options={filtersOptions.subcategory}
                onValueChange={handleSubcategoryChange}
                hideResetButton
                disabled={filtersDisabled}
                value={filtersSelected.subcategory}
              />
              <Dropdown
                label="Indicator"
                placeholder="Select an indicator"
                options={filtersOptions.indicators}
                hideResetButton
                disabled={filtersDisabled}
                onValueChange={option =>
                  handleSelectorChange(option, 'indicator')
                }
                value={filtersSelected.indicator}
              />
            </div>
            <TabletLandscape>{this.renderExploreButtonGroup()}</TabletLandscape>
          </div>
        </div>
        {renderChart()}
        <TabletPortraitOnly>
          {this.renderExploreButtonGroup()}
        </TabletPortraitOnly>
        <ModalPngDownload
          id={pngDownloadId}
          title="Agriculture historical future pathways"
          selectionSubtitle={pngSelectionSubtitle}
        >
          {renderChart(true)}
        </ModalPngDownload>
        <ModalOverview
          data={modalData}
          title={'Pathways Metadata'}
          tabTitles={[
            'Model',
            'Scenarios',
            filtersSelected.indicator ? 'Indicator' : null
          ]}
        />
      </div>
    );
  }
}

AgricultureEmissionPathwayGraph.propTypes = {
  data: PropTypes.array,
  domain: PropTypes.object,
  modalData: PropTypes.array,
  model: PropTypes.object,
  config: PropTypes.object,
  explorePathwaysConfig: PropTypes.object,
  downloadLink: PropTypes.string,
  loading: PropTypes.bool,
  error: PropTypes.bool,
  filtersLoading: PropTypes.object,
  filtersOptions: PropTypes.object,
  filtersSelected: PropTypes.object,
  handleSelectorChange: PropTypes.func,
  handleInfoClick: PropTypes.func,
  handleModelChange: PropTypes.func,
  handleClearSelection: PropTypes.func,
  handleSubcategoryChange: PropTypes.func,
  handleCurrentLocationChange: PropTypes.func,
  handlePngDownloadModal: PropTypes.func.isRequired,
  pngSelectionSubtitle: PropTypes.string,
  pngDownloadId: PropTypes.string.isRequired
};

export default AgricultureEmissionPathwayGraph;
