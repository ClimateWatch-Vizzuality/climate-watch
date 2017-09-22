import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import RegionsProvider from 'providers/regions-provider';
import ChartStackedArea from 'components/charts/stacked-area';
import Dropdown from 'components/dropdown';
import ButtonGroup from 'components/button-group';
import Tag from 'components/tag';

import styles from './ghg-emissions-styles.scss';

const ghgEmissionsSampleConfig = {
  axes: {
    xBottom: {
      name: 'Year',
      unit: 'date',
      format: 'YYYY'
    },
    yLeft: {
      name: 'Emissions',
      unit: 'MtCO2e',
      format: 'number'
    }
  },
  type: 'stackedArea',
  columns: {
    x: ['x'],
    y: ['yRussia', 'yChina', 'yEUR28']
  },
  theme: {
    yRussia: { fill: '#302463' },
    yChina: { fill: '#d5eaf7' },
    yEUR28: { fill: '#103d5c', stroke: '#113750', strokeWidth: '5' }
  },
  tooltip: {
    yRussia: {
      label: 'Russia'
    },
    yChina: {
      label: 'China',
      prefix: '', // optional
      format: '', // just in case you want to show it in a different axes way
      sufix: '', // optional
      type: 'number'
    },
    yEUR28: {
      label: 'EUR28'
    }
  }
};

const ghgEmissionsSampleData = [
  { x: 1970, yRussia: 2343, yChina: 2400, yEUR28: 2452 },
  { x: 1975, yRussia: 2432, yChina: 2345, yEUR28: 1234 },
  { x: 1980, yRussia: 5321, yChina: 3453, yEUR28: 5321 },
  { x: 1985, yRussia: 4000, yChina: 2313, yEUR28: 1342 },
  { x: 1990, yRussia: 2345, yChina: 2400, yEUR28: 2400 },
  { x: 1995, yRussia: 3000, yChina: 1398, yEUR28: 2210 },
  { x: 2000, yRussia: 2000, yChina: 9800, yEUR28: 2290 },
  { x: 2005, yRussia: 2780, yChina: 3908, yEUR28: 2000 },
  { x: 2010, yRussia: 1890, yChina: 4800, yEUR28: 2181 },
  { x: 2015, yRussia: 2390, yChina: 3800, yEUR28: 2500 },
  { x: 2020, yRussia: 3490, yChina: 4300, yEUR28: 2100 }
];

class GhgEmissions extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
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
        <RegionsProvider />
        <ChartStackedArea
          config={ghgEmissionsSampleConfig}
          data={ghgEmissionsSampleData}
        />
        <Tag
          data={{
            color: 'red',
            name: 'United States'
          }}
          onRemove={() => {
            console.info('please remove me');
          }}
        />
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
