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

import layout from 'styles/layout.scss';
import styles from './emission-pathway-graph-styles.scss';

class EmissionPathwayGraph extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      data,
      config,
      loading,
      locationsOptions,
      locationSelected,
      scenarioSelected,
      handleLocationChange
    } = this.props;
    return (
      <div className={styles.wrapper}>
        <div className={layout.content}>
          <EspLocationsProvider />
          {locationSelected &&
            scenarioSelected && (
              <EspTimeSeriesProvider
                location={locationSelected}
                scenario={scenarioSelected}
              />
            )}
          <h2 className={styles.title}>Emission Pathways</h2>
          <div className={styles.col4}>
            <Dropdown
              label="Country/Region"
              options={locationsOptions}
              onValueChange={handleLocationChange}
              value={locationSelected}
              hideResetButton
            />
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
              config && (
                <div>
                  <ChartLine config={config} data={data} height={500} />
                  <div className={styles.tags}>
                    {config.columns &&
                      config.columns.y.map(column => (
                        <Tag
                          className={styles.tag}
                          key={`${column.value}`}
                          data={{
                            color: config.theme[column.value].stroke,
                            label: column.label,
                            id: column.value
                          }}
                          canRemove
                        />
                      ))}
                  </div>
                </div>
              )}
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
  locationsOptions: PropTypes.array,
  locationSelected: PropTypes.object,
  handleLocationChange: PropTypes.func,
  scenarioSelected: PropTypes.string
};

export default EmissionPathwayGraph;
