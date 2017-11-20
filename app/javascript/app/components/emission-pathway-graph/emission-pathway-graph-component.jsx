import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import EspLocationsProvider from 'providers/esp-locations-provider';
import EspTimeSeriesProvider from 'providers/esp-time-series-provider';
import ChartLine from 'components/charts/line';
import ButtonGroup from 'components/button-group';
import Dropdown from 'components/dropdown';
import Tag from 'components/tag';
import Loading from 'components/loading';
import NoContent from 'components/no-content';
import MultiSelect from 'components/multiselect';
import Icon from 'components/icon';

import plusIcon from 'assets/icons/plus.svg';
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
      handleModelChange,
      handleRemoveTag,
      handleAddTag
    } = this.props;
    return (
      <div className={styles.wrapper}>
        <div className={layout.content}>
          <EspLocationsProvider />
          {filtersSelected &&
            filtersSelected.location &&
            filtersSelected.model && (
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
              label="Models and scenarios"
              options={filtersOptions.models}
              onValueChange={handleModelChange}
              value={filtersSelected.model}
              hideResetButton
            />
            <Dropdown
              label="Indicators"
              placeholder="Select an indicator"
              options={filtersOptions.indicators}
              onValueChange={option =>
                handleSelectorChange(option, 'indicator')}
              value={filtersSelected.indicator}
            />
            <div />
            <ButtonGroup className={styles.colEnd} />
          </div>
          <div className={styles.chartWrapper}>
            {loading && <Loading light className={styles.loader} />}
            {!loading &&
              (!data || !data.length) && (
                <NoContent
                  message={'No data selected'}
                  className={styles.noContent}
                  icon
                />
              )}
            {data &&
            data.length > 0 &&
            config && <ChartLine config={config} data={data} height={500} />}
            <div className={styles.tags}>
              {!loading &&
                config &&
                config.columns &&
                config.columns.y.map(column => (
                  <Tag
                    className={styles.tag}
                    key={`${column.value}`}
                    data={{
                      color: config.theme[column.value].stroke,
                      label: column.label,
                      id: column.value
                    }}
                    onRemove={handleRemoveTag}
                    canRemove
                  />
                ))}
              {!loading &&
              filtersOptions.scenarios &&
              filtersSelected.scenarios &&
              filtersSelected.scenarios.length !==
                filtersOptions.scenarios.length && (
                  <MultiSelect
                    parentClassName={styles.tagSelector}
                    values={filtersSelected.scenarios || []}
                    options={filtersOptions.scenarios || []}
                    onMultiValueChange={handleAddTag}
                    hideResetButton
                  >
                    <Icon className={styles.plusIcon} icon={plusIcon} />
                  </MultiSelect>
                )}
            </div>
          </div>
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
  handleModelChange: PropTypes.func,
  handleRemoveTag: PropTypes.func,
  handleAddTag: PropTypes.func
};

export default EmissionPathwayGraph;
