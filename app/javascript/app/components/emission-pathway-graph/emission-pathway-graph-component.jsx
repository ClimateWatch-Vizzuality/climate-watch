import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import EspLocationsProvider from 'providers/esp-locations-provider';
import EspTimeSeriesProvider from 'providers/esp-time-series-provider';
import ButtonGroup from 'components/button-group';
import ModalOverview from 'components/modal-overview';
import Dropdown from 'components/dropdown';
import Chart from 'components/charts/chart';
import EspModelsProvider from 'providers/esp-models-provider';
import EspScenariosProvider from 'providers/esp-scenarios-provider';
import EspIndicatorsProvider from 'providers/esp-indicators-provider';

import layout from 'styles/layout.scss';
import styles from './emission-pathway-graph-styles.scss';

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
      handleCategoryChange,
      handleModelChange,
      handleInfoClick,
      modalData
    } = this.props;
    const shouldRenderEspTimeSeriesProvider =
      filtersSelected && filtersSelected.location && filtersSelected.model;
    return (
      <div className={styles.wrapper}>
        <div className={layout.content}>
          <EspModelsProvider />
          <EspScenariosProvider />
          <EspIndicatorsProvider />
          <EspLocationsProvider withTimeSeries />
          {shouldRenderEspTimeSeriesProvider && (
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
              label="Categories"
              placeholder="Select a category"
              options={filtersOptions.categories}
              onValueChange={option => handleCategoryChange(option, 'category')}
              value={filtersSelected.category}
              hideResetButton
            />
            <Dropdown
              label="Indicator"
              placeholder="Select an indicator"
              options={filtersOptions.indicators}
              onValueChange={option =>
                handleSelectorChange(option, 'indicator')}
              value={filtersSelected.indicator}
              hideResetButton
            />
            <ButtonGroup
              className={styles.colEnd}
              onInfoClick={handleInfoClick}
              shareUrl="/embed/emission-pathways"
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
            unit={filtersSelected.indicator && filtersSelected.indicator.unit}
          />
        </div>
        <ModalOverview
          data={modalData}
          title={'Emission Pathways Metadata'}
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
  config: PropTypes.object,
  loading: PropTypes.bool,
  filtersOptions: PropTypes.object,
  filtersSelected: PropTypes.object,
  handleSelectorChange: PropTypes.func,
  handleModelChange: PropTypes.func,
  handleCategoryChange: PropTypes.func,
  handleInfoClick: PropTypes.func,
  modalData: PropTypes.array
};

export default EmissionPathwayGraph;
