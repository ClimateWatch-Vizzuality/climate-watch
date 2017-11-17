import React from 'react';
import cx from 'classnames';
import map from 'lodash/map';

import styles from './viz-creator-styles';

const SelectableList = ({ type, data, selected, onClick, children }) => (
  <ul className={styles[`${type}s`]}>
    {map(data, (d, name) =>
      (<li key={name} className={cx(styles[type], { [styles[`${type}Selected`]]: selected === name })}>
        <button onClick={() => onClick(name)}>{children({ ...d, name: d.name || name }) }</button>
      </li>))}
  </ul>
);

const VizCreator = ({
  datasets,
  selectDataset,
  dataset,
  visualizations,
  selectViz,
  visualization,
  filters,
  filter,
  selectFilter
}) => (
  <div className={styles.container}>
    <ul className={styles.steps}>
      <li className={styles.step}>
        <h1>1/4 - Select a dataset</h1>
        <SelectableList type="dataset" data={datasets} selected={dataset} onClick={selectDataset}>
          {d => d.name }
        </SelectableList >
      </li>
      <li className={styles.step}>
        <h1>2/4 - Select what you want to compare</h1>
        <SelectableList type="visualization" data={visualizations} selected={visualization} onClick={selectViz}>
          {d => d.name}
        </SelectableList >
      </li>
      <li className={styles.step}>
        <h1>3/4 - Filter the data</h1>

        <SelectableList type="filter" data={filters} selected={filter}>
          {d => d.name}
        </SelectableList >
      </li>
      <li className={styles.step}>
        <h1>4/4 - Annotate the visualisation</h1>
      </li>
    </ul>
  </div>
);

export default VizCreator;
