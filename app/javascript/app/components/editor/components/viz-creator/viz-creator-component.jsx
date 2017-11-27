import React from 'react';
import cx from 'classnames';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import _ from 'lodash-inflection';
import MultiSelect from 'components/multiselect';
import Dropdown from 'components/dropdown';
import SelectableList from './components/selectable-list';
import styles from './viz-creator-styles';

const VizCreator = ({
  datasets,
  selectDataset,
  dataset,
  visualisations,
  selectViz,
  visualisation,
  filters,
  selectors,
  selectFilter,
  categories
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
                    disabled={isEmpty(filters[f.name].data)}
                    label={f.name}
                    values={filters[f.name].selected}
                    options={filters[f.name].data}
                    placeholder={filters[f.name].placeholder}
                    onMultiValueChange={e =>
                      selectFilter({
                        values: e,
                        type: f.name
                      })}
                  />
                ) : (
                  filters[f.name] && (
                    <Dropdown
                      label={filters[f.name].label}
                      disabled={isEmpty(filters[f.name].data)}
                      onValueChange={e =>
                        selectFilter({
                          ...e,
                          type: f.name
                        })}
                      value={filters[f.name].selected}
                      options={filters[f.name].data}
                      placeholder={filters[f.name].placeholder}
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
        <ul>
          {map(filters, (f, name) => (
            <li key={name}>
              {name}: {f.selected && f.selected.label}
            </li>
          ))}
        </ul>
      </li>
    </ul>
  </div>
);

export default VizCreator;
