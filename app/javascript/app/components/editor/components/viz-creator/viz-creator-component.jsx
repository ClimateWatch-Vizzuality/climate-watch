import React from 'react';
import cx from 'classnames';
import map from 'lodash/map';

import MultiSelect from 'components/multiselect';
import Dropdown from 'components/dropdown';
import styles from './viz-creator-styles';

const SelectableList = ({ type, data, selected, onClick, children, log }) => (
  <ul className={styles[`${type}s`]}>
    {map(data, item => (
      <li
        key={item.id}
        className={cx(styles[type], {
          [styles[`${type}Selected`]]: selected === item.id
        })}
      >
        <button onClick={() => onClick(item.id)}>{children(item)}</button>
      </li>
    ))}
  </ul>
);

const VizCreator = ({
  datasets,
  selectDataset,
  dataset,
  visualisations,
  selectViz,
  visualisation,
  filters,
  selectors,
  selectFilter
}) => (
  <div className={styles.container}>
    <ul className={styles.steps}>
      <li className={styles.step}>
        <h1>1/4 - Select a dataset</h1>
        <SelectableList
          type="dataset"
          data={datasets.data}
          selected={dataset}
          onClick={selectDataset}
        >
          {d => d.name}
        </SelectableList>
      </li>
      <li className={styles.step}>
        <h1>2/4 - Select what you want to compare</h1>
        {map(visualisations, vs => [
          <h2 key={vs.id}>{vs.name}</h2>,
          <SelectableList
            type="visualisation"
            data={vs.visualisations}
            selected={visualisation}
            key={`v-${vs.id}`}
            onClick={selectViz}
          >
            {d => d.name}
          </SelectableList>
        ])}
      </li>
      <li className={styles.step}>
        <h1>3/4 - Filter the data</h1>
        {selectors && (
          <ul>
            {selectors.map(f => (
              <li key={f.name}>
                {filters[f.name] && f.multi ? (
                  <MultiSelect
                    selectedLabel={null}
                    label={f.name}
                    values={filters[f.name].data.map(o => `location-${o.id}`)}
                    options={filters[f.name].data.map(o => ({
                      label: o.name,
                      values: `location-${o.id}`
                    }))}
                    onMultiValueChange={e => console.log(e)}
                  />
                ) : (
                  filters[f.name] && (
                    <Dropdown
                      label={f.name}
                      options={
                        (filters[f.name] &&
                          filters[f.name].data.map(o => ({
                            label: o.name,
                            values: o.id
                          }))) ||
                        null
                      }
                      onValueChange={e =>
                        selectFilter({
                          label: e.label,
                          type: f.name,
                          values: e.values
                        })}
                      value={filters[f.name].selected}
                      hideResetButton
                    />
                  )
                )}
              </li>
            ))}
          </ul>
        )}
      </li>
      <li className={styles.step}>
        <h1>4/4 - Annotate the visualisation</h1>
      </li>
    </ul>
  </div>
);

export default VizCreator;
