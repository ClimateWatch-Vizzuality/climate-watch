import React from 'react';
import startCase from 'lodash/startCase';
import _ from 'lodash-inflection';
import { selections } from './viz-creator-mocks';
import { processLineData } from './viz-creator-utils';
import LineChart from './components/charts/line/line';

const toFetcher = name => `fetch${_.pluralize(startCase(name))}`;
const toSelector = name => `select${_.singularize(startCase(name))}`;

const Option = ({
  enableLoad, // eslint-disable-line
  enableSelect, // eslint-disable-line
  onClickLoad, // eslint-disable-line
  onClickSelect, // eslint-disable-line
  name // eslint-disable-line
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

const VizCreator = ({
  fetchDatasets, // eslint-disable-line
  selectDataset, // eslint-disable-line
  fetchVisualisations, // eslint-disable-line
  selectVisualisation, // eslint-disable-line
  fetchLocations, // eslint-disable-line
  selectLocation, // eslint-disable-line
  fetchModels, // eslint-disable-line
  selectModel, // eslint-disable-line
  fetchScenarios, // eslint-disable-line
  selectScenario, // eslint-disable-line
  fetchIndicators, // eslint-disable-line
  selectIndicator, // eslint-disable-line
  fetchCategories, // eslint-disable-line
  selectCategory, // eslint-disable-line
  fetchSubCategories, // eslint-disable-line
  selectSubCategory, // eslint-disable-line
  fetchTimeseries, // eslint-disable-line
  datasets, // eslint-disable-line
  visualisations, // eslint-disable-line
  locations, // eslint-disable-line
  models, // eslint-disable-line
  scenarios, // eslint-disable-line
  indicators, // eslint-disable-line
  categories, // eslint-disable-line
  subcategories, // eslint-disable-line
  timeseries, // eslint-disable-line
  hasData // eslint-disable-line
}) => (
  <div>
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
        onClickSelect={() => selectSubCategory(selections.subcategories.value)}
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

export default VizCreator;
