import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import EspLocationsProvider from 'providers/esp-locations-provider';
import EspTimeSeriesProvider from 'providers/esp-time-series-provider';
import ButtonGroup from 'components/button-group';
import Dropdown from 'components/dropdown';
import Chart from 'components/charts/chart';

import layout from 'styles/layout.scss';
import styles from './emission-pathways-graph-styles.scss';

class EmissionPathwayGraph extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      data,
      config,
      loading,
      filtersOptions,
      filtersSelected,
      handleSelectorChange,
      handleModelChange
    } = this.props;
    const needsTimeSeries =
      filtersSelected && filtersSelected.location && filtersSelected.model;
    return (
      <div className={styles.wrapper}>
        <div className={layout.content}>
          <EspLocationsProvider withTimeSeries />
          {needsTimeSeries && (
            <EspTimeSeriesProvider
              location={filtersSelected.location.value}
              model={filtersSelected.model.value}
            />
          )}
          <h2 className={styles.title}>Emission Pathways</h2>
          <div className={styles.col4}>
            <Dropdown
              label="Country/Region"
              options={filtersOptions.locations}
              onValueChange={option =>
                handleSelectorChange(option, 'currentLocation', true)}
              value={filtersSelected.location}
              hideResetButton
            />
            <Dropdown
              label="Model"
              options={filtersOptions.models}
              onValueChange={handleModelChange}
              value={filtersSelected.model}
              hideResetButton
            />
            <Dropdown
              label="Indicator"
              placeholder="Select an indicator"
              options={filtersOptions.indicators}
              onValueChange={option =>
                handleSelectorChange(option, 'indicator')}
              value={filtersSelected.indicator}
            />
            <div />
            <ButtonGroup
              className={styles.colEnd}
              shareUrl="/embed/emission-pathway-graph"
            />
          </div>
          <Chart
            className={styles.chartWrapper}
            type="line"
            config={config}
            data={data}
            dataOptions={filtersOptions.scenarios}
            dataSelected={filtersSelected.scenarios}
            height={500}
            loading={loading}
            targetParam="scenario"
          />
        </div>
      </div>
    );
  }
}

EmissionPathwayGraph.propTypes = {
  data: PropTypes.array,
  config: PropTypes.object,
  loading: PropTypes.bool,
  filtersOptions: PropTypes.object,
  filtersSelected: PropTypes.object,
  handleSelectorChange: PropTypes.func,
  handleModelChange: PropTypes.func
};

export default EmissionPathwayGraph;
