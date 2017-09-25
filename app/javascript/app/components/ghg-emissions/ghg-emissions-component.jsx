import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import RegionsProvider from 'providers/regions-provider';
import ChartStackedArea from 'components/charts/stacked-area';
import Dropdown from 'components/dropdown';
import ButtonGroup from 'components/button-group';
import Tag from 'components/tag';

import styles from './ghg-emissions-styles.scss';

class GhgEmissions extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      data,
      config,
      sources,
      sourceSelected,
      handleSourceChange,
      breaksBy,
      breakSelected,
      handleBreakByChange,
      filters,
      filterSelected,
      handleFilterChange
    } = this.props;
    return (
      <div>
        <h2
          className={styles.title}
        >{`Global Historical Emissions - ${filterSelected.label}`}</h2>
        <RegionsProvider />
        <ChartStackedArea config={config} data={data} />
        <div className={styles.tags}>
          {config.columns.y &&
            config.columns.y.map(column => (
              <Tag
                key={column.value}
                data={{
                  color: 'red',
                  name: column.label
                }}
                onRemove={() => {
                  console.info('please remove me');
                }}
              />
            ))}
        </div>
        <div className={styles.col4}>
          <Dropdown
            label="Category"
            options={sources}
            onChange={handleSourceChange}
            value={sourceSelected}
            clearable={false}
          />
          <Dropdown
            label="BreakBy"
            options={breaksBy}
            onChange={handleBreakByChange}
            value={breakSelected}
            clearable={false}
          />
          <Dropdown
            label={breakSelected.label}
            options={filters}
            onChange={handleFilterChange}
            value={filterSelected}
            clearable={false}
          />
          <ButtonGroup className={styles.colEnd} />
        </div>
      </div>
    );
  }
}

GhgEmissions.propTypes = {
  data: PropTypes.array.isRequired,
  config: PropTypes.object.isRequired,
  sources: PropTypes.array.isRequired,
  sourceSelected: PropTypes.object.isRequired,
  handleSourceChange: PropTypes.func.isRequired,
  breaksBy: PropTypes.array.isRequired,
  breakSelected: PropTypes.object.isRequired,
  handleBreakByChange: PropTypes.func.isRequired,
  filters: PropTypes.array.isRequired,
  filterSelected: PropTypes.object.isRequired,
  handleFilterChange: PropTypes.func.isRequired
};

export default GhgEmissions;
