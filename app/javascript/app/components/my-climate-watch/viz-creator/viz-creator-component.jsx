import React from 'react';
import _startCase from 'lodash/startCase';
import _map from 'lodash/map';
import _isUndefined from 'lodash/isUndefined';
import _isEmpty from 'lodash/isEmpty';
import _ from 'lodash-inflection';

import MultiSelect from 'components/multiselect';
import Dropdown from 'components/dropdown';

import { selections } from './viz-creator-mocks';
import { processLineData } from './viz-creator-utils';
import LineChart from './components/charts/line/line';
import SelectableList from './components/selectable-list';
import styles from './viz-creator-styles';

const toFetcher = name => `fetch${_.pluralize(_startCase(name))}`;
const toSelector = name => `select${_.singularize(_startCase(name))}`;

const Option = ({
  enableLoad,
  enableSelect,
  onClickLoad,
  onClickSelect,
  name
}) => (
  <li>
    {enableLoad && (
      <button disabled={!enableLoad} onClick={onClickLoad}>
        {toFetcher(name)}
      </button>
    )}
    {enableSelect && (
      <button disabled={!enableSelect} onClick={onClickSelect}>
        {toSelector(name)}
      </button>
    )}
  </li>
);

const Step1 = ({ datasets, dataset, selectDataset }) => (
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
);

const Step2 = ({ visualisations, visualisation, selectVisualisation }) => (
  <li className={styles.step}>
    <h1>2/4 - Select what you want to compare</h1>
    {_map(visualisations.data, vs => [
      <h2 key={vs.id}>{vs.name}</h2>,
      <SelectableList
        type="visualisation"
        data={vs.visualisations}
        selected={visualisation}
        key={`v-${vs.id}`}
        onClick={selectVisualisation}
      >
        {d => d.name}
      </SelectableList>
    ])}
  </li>
);

const Step3 = props => {
  const selectFilter = console.log.bind(console);
  const { spec } = props;
  console.log(spec, props);
  const selectProps = (f, value) => {
    const dd = props[f.name];
    return {
      disabled: !_isUndefined(dd.active) || _isEmpty(dd.data),
      [value]: dd.selected || [],
      options: dd.data || [],
      placeholder: dd.placeholder || dd.name
    };
  };

  return (
    <li className={styles.step}>
      <h1>3/4 - Filter the data</h1>
      {spec && (
        <ul>
          {_map(spec, f => (
            <li key={f.id}>
              {props[f.name] && f.multi ? (
                <MultiSelect
                  // log={console.log(selectProps(f, 'values'))}
                  {...selectProps(f, 'values')}
                  label={f.name}
                  onMultiValueChange={e =>
                    selectFilter({
                      values: e,
                      type: f.name
                    })}
                />
              ) : (
                props[f.name] && (
                  <Dropdown
                    {...selectProps(f, 'value')}
                    label={props[f.name].label}
                    onValueChange={e =>
                      selectFilter({
                        ...e,
                        type: f.name
                      })}
                    hideResetButton
                  />
                )
              )}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

const VizCreator = props => {
  const {
    fetchDatasets,
    selectDataset,
    fetchVisualisations,
    selectVisualisation,
    fetchLocations,
    selectLocation,
    fetchModels,
    selectModel,
    fetchScenarios,
    selectScenario,
    fetchIndicators,
    selectIndicator,
    fetchCategories,
    selectCategory,
    fetchSubCategories,
    selectSubCategory,
    fetchTimeseries,
    datasets,
    visualisations,
    locations,
    models,
    scenarios,
    indicators,
    categories,
    subcategories,
    timeseries,
    hasData,
    filters
  } = props;
  // console.log(datasets);
  return (
    <div>
      <div className={styles.container}>
        <ul className={styles.steps}>
          <Step1 {...{ datasets, dataset: datasets.selected, selectDataset }} />
          <Step2
            {...{
              visualisations,
              visualisation: visualisations.selected,
              selectVisualisation
            }}
          />
          <Step3 {...{ spec: filters, ...props }} />
        </ul>
      </div>
      <ul style={{ listStyle: 'none' }}>
        <Option
          name="dataset"
          enableLoad
          enableSelect={datasets.loaded}
          onClickLoad={fetchDatasets}
          onClickSelect={() => selectDataset(selections.datasets.value)}
        />
        <Option
          name="visualisations"
          enableLoad={datasets.selected}
          enableSelect={visualisations.loaded}
          onClickLoad={() => fetchVisualisations(datasets.selected)}
          onClickSelect={() =>
            selectVisualisation(selections.visualisations.value)}
        />
        <Option
          name="locations"
          enableLoad={visualisations.selected}
          enableSelect={locations.loaded}
          onClickLoad={() => fetchLocations(visualisations.selected)}
          onClickSelect={() => selectLocation(selections.locations.value)}
        />
        <Option
          name="models"
          enableLoad={locations.selected}
          enableSelect={models.loaded}
          onClickLoad={() => fetchModels(locations.selected)}
          onClickSelect={() => selectModel(selections.models.value)}
        />
        <Option
          name="scenarios"
          enableLoad={models.selected}
          enableSelect={scenarios.loaded}
          onClickLoad={() => fetchScenarios(models.selected)}
          onClickSelect={() => selectScenario(selections.scenarios)}
        />
        <Option
          name="categories"
          enableLoad={indicators.loaded}
          enableSelect={indicators.loaded}
          onClickLoad={() =>
            fetchIndicators({
              location: { value: locations.selected },
              scenarios: scenarios.selected
            })}
          onClickSelect={() => selectCategory(selections.categories.value)}
        />
        <Option
          name="subcategories"
          enableLoad={indicators.loaded}
          enableSelect={categories.selected}
          onClickLoad={() =>
            fetchIndicators({
              location: { value: locations.selected },
              scenarios: scenarios.selected
            })}
          onClickSelect={() =>
            selectSubCategory(selections.subcategories.value)}
        />
        <Option
          name="indicators"
          enableLoad={scenarios.selected}
          enableSelect={subcategories.selected}
          onClickLoad={() =>
            fetchIndicators({
              location: { value: locations.selected },
              scenarios: scenarios.selected
            })}
          onClickSelect={() => selectIndicator(selections.indicators)}
        />
      </ul>
      {hasData && (
        <button
          onClick={() =>
            fetchTimeseries({
              locations: locations.selected,
              indicators: indicators.selected.value,
              scenarios: scenarios.selected
            })}
        >
          fetchTimeseries
        </button>
      )}
      {timeseries.loaded && (
        <LineChart {...processLineData(timeseries.data, scenarios.data)} />
      )}
    </div>
  );
};

export default VizCreator;
