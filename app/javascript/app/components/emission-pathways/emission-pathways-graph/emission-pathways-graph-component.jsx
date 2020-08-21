import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import EspLocationsProvider from 'providers/esp-locations-provider';
import EspModelsProvider from 'providers/esp-models-provider';
import EspScenariosProvider from 'providers/esp-scenarios-provider';
import EspIndicatorsProvider from 'providers/esp-indicators-provider';
import EspTimeSeriesProvider from 'providers/esp-time-series-provider';
import ButtonGroup from 'components/button-group';
import ModalOverview from 'components/modal-overview';
import Dropdown from 'components/dropdown';
import Chart from 'components/charts/chart';
import ModalShare from 'components/modal-share';
import ShareButton from 'components/button/share-button';
import { TabletLandscape, TabletPortraitOnly } from 'components/responsive';

import layout from 'styles/layout.scss';
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
        {`${getName('location')} doesn't have any data for ${getName(
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
      handleInfoClick,
      modalData,
      model,
      handleModelChange,
      downloadLink
    } = this.props;
    const needsTimeSeries =
      filtersSelected && filtersSelected.location && filtersSelected.model;
    const filtersDisabled =
      filtersLoading.indicators ||
      filtersLoading.timeseries ||
      filtersLoading.models;

    return (
      <div className={styles.wrapper}>
        <div className={layout.content}>
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
            <div className={styles.titleAndBtnsWrapper}>
              <h2 className={styles.title}>Pathways</h2>
              <TabletLandscape>
                <ButtonGroup
                  className={styles.buttonGroup}
                  buttonsConfig={[
                    {
                      type: 'info',
                      onClick: handleInfoClick
                    },
                    {
                      type: 'download',
                      section: 'emission-pathways',
                      link: downloadLink
                    },
                    {
                      type: 'addToUser'
                    }
                  ]}
                />
                <ShareButton
                  className={styles.shareButton}
                  sharePath="/pathways"
                />
              </TabletLandscape>
            </div>
          </div>
          <div className="grid-column-item">
            <div className={styles.selectorsWrapper}>
              <Dropdown
                label="Country/Region"
                options={filtersOptions.locations}
                onValueChange={option =>
                  handleSelectorChange(option, 'currentLocation')
                }
                value={filtersSelected.location}
                hideResetButton
              />
              <Dropdown
                label="Model"
                options={filtersOptions.models}
                onValueChange={handleModelChange}
                disabled={filtersLoading.location}
                value={filtersSelected.model}
                hideResetButton
              />
              <Dropdown
                label="Category"
                placeholder="Select a category"
                options={filtersOptions.category}
                hideResetButton
                disabled={filtersDisabled}
                onValueChange={option =>
                  handleSelectorChange(option, 'category')
                }
                value={filtersSelected.category}
              />
              <Dropdown
                label="Subcategory"
                placeholder="Select a subcategory"
                options={filtersOptions.subcategory}
                hideResetButton
                disabled={filtersDisabled}
                onValueChange={option =>
                  handleSelectorChange(option, 'subcategory')
                }
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
            customD3Format={'.3f'}
            margin={{ top: 50 }}
            espGraph
            model={model || null}
          />
          <TabletPortraitOnly>
            <div className="grid-column-item">
              <div className={styles.buttonsWrapper}>
                <ButtonGroup
                  className={styles.buttonGroup}
                  buttonsConfig={[
                    {
                      type: 'info',
                      onClick: handleInfoClick
                    },
                    {
                      type: 'download',
                      section: 'ndcs-content',
                      link: downloadLink
                    },
                    {
                      type: 'addToUser'
                    }
                  ]}
                />
                <ShareButton className={styles.shareButton} />
              </div>
            </div>
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
        <ModalShare analyticsName="Pathways" />
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
