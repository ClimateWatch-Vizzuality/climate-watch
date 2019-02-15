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
import ExploreButtonGroup from '../explore-group';

import styles from './emission-pathways-graph-styles.scss';

class EmissionPathwayGraph extends PureComponent {
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
    const { downloadLink, handleInfoClick, explorePathwaysConfig } = this.props;
    const buttonGroupConfig = [
      {
        type: 'info',
        onClick: handleInfoClick
      },
      {
        type: 'share',
        analyticsGraphName: 'Drivers of Emissions',
        positionRight: true
      },
      {
        type: 'download',
        section: 'pathways',
        link: downloadLink
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
      handleModelChange
    } = this.props;
    const needsTimeSeries =
      filtersSelected && filtersSelected.location && filtersSelected.model;
    const filtersDisabled =
      filtersLoading.indicators ||
      filtersLoading.timeseries ||
      filtersLoading.models;

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
            <div className={styles.filtersWrapper}>
              <Dropdown
                label="Region"
                options={filtersOptions.locations}
                onValueChange={option =>
                  handleSelectorChange(option, 'currentLocation')}
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
                label="Indicator"
                placeholder="Select an indicator"
                options={filtersOptions.indicators}
                hideResetButton
                disabled={filtersDisabled}
                onValueChange={option =>
                  handleSelectorChange(option, 'indicator')}
                value={filtersSelected.indicator}
              />
            </div>
            <TabletLandscape>{this.renderExploreButtonGroup()}</TabletLandscape>
          </div>
        </div>
        <Chart
          className={styles.chartWrapper}
          type="line"
          config={config}
          data={data}
          domain={domain}
          dataOptions={filtersOptions.scenarios}
          dataSelected={filtersSelected.scenario}
          customMessage={this.renderCustomMessage()}
          height={600}
          loading={loading}
          error={error}
          targetParam="scenario"
          forceFixedFormatDecimals={3}
          margin={{ top: 50 }}
          espGraph
          model={model || null}
        />
        <TabletPortraitOnly>
          {this.renderExploreButtonGroup()}
        </TabletPortraitOnly>
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

EmissionPathwayGraph.propTypes = {
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
  handleClearSelection: PropTypes.func
};

export default EmissionPathwayGraph;
